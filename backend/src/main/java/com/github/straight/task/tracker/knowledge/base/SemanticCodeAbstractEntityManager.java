package com.github.straight.task.tracker.knowledge.base;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.Id;

import org.ostis.api.context.DefaultScContext;
import org.ostis.scmemory.model.element.edge.EdgeType;
import org.ostis.scmemory.model.element.edge.ScEdge;
import org.ostis.scmemory.model.element.link.LinkContentType;
import org.ostis.scmemory.model.element.link.LinkType;
import org.ostis.scmemory.model.element.link.ScLinkString;
import org.ostis.scmemory.model.element.node.NodeType;
import org.ostis.scmemory.model.element.node.ScNode;
import org.ostis.scmemory.model.exception.ScMemoryException;
import org.ostis.scmemory.model.pattern.factory.DefaultScPattern5Factory;
import org.ostis.scmemory.model.pattern.pattern5.ScConstruction5;

public class SemanticCodeAbstractEntityManager<T> {
    private final DefaultScContext context;

    private final ScNode root;
    private final Map<String, ScNode> relations = new HashMap<>();

    public SemanticCodeAbstractEntityManager(DefaultScContext context) {
        this.context = context;
        try {
            root = context.createNode(NodeType.CLASS);
        } catch (Exception e) {
            throw new AccessingDatabaseException();
        }
    }

    public String createEntity() {
        try {
            var entity = context.createNode(NodeType.NODE);
            context.createEdge(EdgeType.ACCESS, root, entity);

            var id = UUID.randomUUID().toString();
            addPropertyToEntity(entity, "__id__", id);
            return id;
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public String saveEntity(T entity) throws IllegalAccessException {
        var entityId = createEntity();
        for (var field : entity.getClass().getDeclaredFields()) {
            field.setAccessible(true);

            if (field.isAnnotationPresent(Id.class)) {
                continue;
            }

            if (Arrays.asList(field.getType().getInterfaces()).contains(Collection.class)) {
                for (var item : (List<?>) field.get(entity)) {
                    addPropertyToEntity(
                            getEntityById(entityId),
                            field.getName().substring(0, field.getName().length() - 1),
                            String.valueOf(item));
                }
            } else if (!field.getName().equals("__id__")) {
                addPropertyToEntity(getEntityById(entityId), field.getName(), String.valueOf(field.get(entity)));
            }
        }
        return entityId;
    }

    public T loadEntity(T object, String entityId) throws IllegalAccessException {
        for (var field : object.getClass().getDeclaredFields()) {
            field.setAccessible(true);

            if (field.isAnnotationPresent(Id.class)) {
                continue;
            }

            if (!Arrays.asList(field.getType().getInterfaces()).contains(Collection.class)) {
                field.set(object, getPropertyByEntityId(entityId, field.getName()));
            }
        }
        return object;
    }

    public void deleteEntityById(String entityId) {
        try {
            var entity = getEntityById(entityId);
            var edge = context.findAllConstructionsNodeEdgeNode(
                            root,
                            EdgeType.ACCESS,
                            NodeType.NODE)
                    .findFirst();
            context.deleteElement(entity);
            if (edge.isPresent()) {
                context.deleteElement(edge.get());
            }
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public List<String> getEntityIds() {
        try {
            return context.findAllConstructionsNodeEdgeNode(
                            root,
                            EdgeType.ACCESS,
                            NodeType.NODE)
                    .map(edge -> getProperty((ScNode) edge.getTarget(), "__id__"))
                    .toList();
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public ScNode getEntityByProperty(String propertyName, String propertyValue) {
        try {
            return (ScNode) (context.findAllConstructionsNodeEdgeNode(
                            root,
                            EdgeType.ACCESS,
                            NodeType.NODE)
                    .filter(edge -> getProperty((ScNode) edge.getTarget(), propertyName).equals(propertyValue))
                    .findFirst()
                    .orElseThrow(IllegalArgumentException::new))
                    .getTarget();
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public List<String> getEntityIdsByProperty(String propertyName, String propertyValue) {
        try {
            return context.findAllConstructionsNodeEdgeNode(
                            root,
                            EdgeType.ACCESS,
                            NodeType.NODE)
                    .filter(edge -> getProperty((ScNode) edge.getTarget(), propertyName).equals(propertyValue))
                    .map(edge -> getProperty((ScNode) edge.getTarget(), "__id__"))
                    .toList();
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    private ScNode getEntityById(String entityId) {
        return getEntityByProperty("__id__", entityId);
    }

    private void addPropertyToEntity(ScNode entity, String propertyName, String propertyValue) {
        try {
            var edge = context.createEdge(
                    EdgeType.ACCESS,
                    entity,
                    context.createStringLink(LinkType.LINK, propertyValue)
            );
            var relation = relations.computeIfAbsent(propertyName, key -> {
                try {
                    return context.createNode(NodeType.NODE);
                } catch (ScMemoryException e) {
                    throw new AccessingDatabaseException();
                }
            });
            context.createEdge(EdgeType.ACCESS, relation, edge);
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public void addPropertyToEntityById(String entityId, String propertyName, String propertyValue) {
        addPropertyToEntity(getEntityById(entityId), propertyName, propertyValue);
    }

    private Stream<? extends ScEdge> findAllConstructionsNodeEdgeLinkWithRelation(
            ScNode fixedNode,
            EdgeType edge,
            LinkType link,
            LinkContentType linkContent,
            ScNode relation,
            EdgeType relationEdgeType
    ) throws ScMemoryException {
        return context.getMemory().findByPattern5(DefaultScPattern5Factory.get(
                        fixedNode,
                        edge,
                        link,
                        relationEdgeType,
                        relation))
                .map(ScConstruction5::get2);
    }

    private List<String> getPropertyList(ScNode entity, String propertyName) {
        if (!relations.containsKey(propertyName)) {
            throw new IllegalArgumentException("Relation with such name does not exists");
        }

        try {
            return findAllConstructionsNodeEdgeLinkWithRelation(
                    entity,
                    EdgeType.ACCESS,
                    LinkType.LINK,
                    LinkContentType.STRING,
                    relations.get(propertyName),
                    EdgeType.ACCESS
            )
                    .map(edge -> ((ScLinkString) edge.getTarget()).getContent())
                    .collect(Collectors.toList());
        } catch (ScMemoryException e) {
            throw new AccessingDatabaseException();
        }
    }

    public List<String> getPropertyListByEntityId(String entityId, String propertyName) {
        return getPropertyList(getEntityById(entityId), propertyName);
    }

    public String getProperty(ScNode entity, String propertyName) {
        return getPropertyList(entity, propertyName).get(0);
    }

    public String getPropertyByEntityId(String entityId, String propertyName) {
        return getProperty(getEntityById(entityId), propertyName);
    }
}
