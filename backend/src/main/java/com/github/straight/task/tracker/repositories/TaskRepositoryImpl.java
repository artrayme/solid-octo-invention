package com.github.straight.task.tracker.repositories;

import java.util.List;

import com.github.straight.task.tracker.domain.Task;
import com.github.straight.task.tracker.knowledge.base.TaskEntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaskRepositoryImpl implements TaskRepository {
    @Autowired
    private TaskEntityManager taskManager;

    @Override
    public Task save(Task task) {
        return taskManager.save(task);
    }

    @Override
    public void deleteTaskById(String id) {
        taskManager.deleteEntityById(id);
    }

    @Override
    public Task findTaskById(String id) {
        return taskManager.findAll().stream()
                .filter(t -> t.getId().equals(id))
                .findFirst().orElseThrow(() -> new IllegalArgumentException("Who knows? \uD83E\uDD14\uD83E\uDD14" +
                        "\uD83E\uDD14"));
    }

    @Override
    public List<Task> findTasksByProjectId(String projectId) {
        return taskManager.findAll().stream()
                .filter(t -> t.getProjectId().equals(projectId))
                .toList();
    }

/*    private Long idSeq = System.currentTimeMillis() - 1663101249808L;

    private final UncheckedScContext context;

    private final ScNode classTask;

    private final ScNode idRel;
    private final ScNode nameRel;
    private final ScNode descriptionRel;
    private final ScNode statusRel;
    private final ScNode projectIdRel;

    @Autowired
    public TaskRepositoryImpl(SyncOstisScMemory scMemory) {
        context = new UncheckedScContext(scMemory);
        classTask = context.resolveKeynode("student", NodeType.CONST_CLASS);

        idRel = context.resolveKeynode("nrel_id", NodeType.CONST_NO_ROLE);
        nameRel = context.resolveKeynode("nrel_name", NodeType.CONST_NO_ROLE);
        descriptionRel = context.resolveKeynode("nrel_description", NodeType.CONST_NO_ROLE);
        statusRel = context.resolveKeynode("nrel_status", NodeType.CONST_NO_ROLE);
        projectIdRel = context.resolveKeynode("nrel_project_id", NodeType.CONST_NO_ROLE);
    }

    private Stream<Task> findAll() {
        var pattern3 = DefaultScPattern3Factory.get(classTask, EdgeType.ACCESS, NodeType.VAR);
        return context.find(pattern3)
                .map(ScConstruction3::get3)
                .map(this::convertToDomainTask);
    }

    private Task convertToDomainTask(ScNode scNode) {
        var task = new Task();

        try {
            task.setId(Long.valueOf(getFieldValueAsInteger(scNode, idRel)));
            task.setProjectId(Long.valueOf(getFieldValueAsInteger(scNode, projectIdRel)));
        } catch (Exception e) {
            System.out.println(1221);
        }
        task.setDescription(getFieldValueAsString(scNode, descriptionRel));
        task.setName(getFieldValueAsString(scNode, nameRel));
        task.setStatus(getFieldValueAsString(scNode, statusRel));

        return task;
    }

    @Override
    public Task save(Task task) {
        var scTask = context.createNode(NodeType.CONST);

        context.createEdge(EdgeType.ACCESS, classTask, scTask);

        var id = idSeq++;
        var edge = context.createEdge(
                EdgeType.D_COMMON_CONST, scTask, context.createIntegerLink(LinkType.LINK_CONST, id.intValue())
        );
        context.createEdge(EdgeType.ACCESS, idRel, edge);

        edge = context.createEdge(
                EdgeType.D_COMMON_CONST, scTask, context.createStringLink(LinkType.LINK_CONST, task.getName())
        );
        context.createEdge(EdgeType.ACCESS, nameRel, edge);

        edge = context.createEdge(
                EdgeType.D_COMMON_CONST, scTask, context.createStringLink(LinkType.LINK_CONST, task.getDescription())
        );
        context.createEdge(EdgeType.ACCESS, descriptionRel, edge);

        edge = context.createEdge(
                EdgeType.D_COMMON_CONST, scTask, context.createStringLink(LinkType.LINK_CONST, task.getStatus())
        );
        context.createEdge(EdgeType.ACCESS, statusRel, edge);

        edge = context.createEdge(
                EdgeType.D_COMMON_CONST, scTask, context.createIntegerLink(LinkType.LINK_CONST, task.getProjectId().intValue())
        );
        context.createEdge(EdgeType.ACCESS, projectIdRel, edge);

        return task.setId(id);
    }

    @Override
    public void deleteTaskById(Long id) {

    }
//             (taskClass)    (rel)
//                  |           |
//     [name]<--(scTask)------------->[id]

//
    @Override
    public Task findTaskById(Long id) {
        var taskNode = getScNodeByIdField(id);
        return convertToDomainTask(taskNode);
    }

    private String getFieldValueAsString(ScNode taskNode, ScNode relation) {
        var findByRelation = DefaultScPattern5Factory.get(taskNode, EdgeType.D_COMMON, LinkType.LINK_VAR, EdgeType.ACCESS, relation);
        var result = context.find(findByRelation);

        return result
                .map(ScConstruction5::get3)
                .map(e->((ScLinkString)e).getContent())
                .findFirst()
                .orElseThrow(() -> new NotFoundException(Task.class));
    }

    private Integer getFieldValueAsInteger(ScNode taskNode, ScNode relation) {
        var findByRelation = DefaultScPattern5Factory.get(taskNode, EdgeType.D_COMMON, LinkType.LINK_VAR, EdgeType.ACCESS, relation);
        var result = context.find(findByRelation);
        return result
                .map(ScConstruction5::get3)
                .map(e->((ScLinkInteger)e).getContent())
                .findFirst()
                .orElseThrow(() -> new NotFoundException(Task.class));
    }

    private ScNode getScNodeByIdField(Long id) {
        var pattern = new DefaultWebsocketScPattern();
        var requestingScTask = new AliasPatternElement("reqScTask");
        var scTaskToIdEdge = new AliasPatternElement("scTaskIdEdge");
        var idLink = new AliasPatternElement("idLink");
        pattern.addElement(new SearchingPatternTriple(
                new FixedPatternElement(classTask),
                new TypePatternElement<>(EdgeType.ACCESS, new AliasPatternElement("qwe")),
                new TypePatternElement<>(NodeType.VAR, requestingScTask)
        ));
        pattern.addElement(new SearchingPatternTriple(
                requestingScTask,
                new TypePatternElement<>(EdgeType.D_COMMON_VAR, scTaskToIdEdge),
                new TypePatternElement<>(LinkType.LINK_VAR, idLink)
        ));
        pattern.addElement(new SearchingPatternTriple(
                new FixedPatternElement(idRel),
                new TypePatternElement<>(EdgeType.ACCESS, new AliasPatternElement("qwe2")),
                scTaskToIdEdge
        ));
        var internalTaskIds = context.find(pattern).map(e -> ((ScLinkInteger)e.toList().get(5)).getContent()).toList();
        int desiredInternalTaskIdIndex = -1;
        for (int i = 0; i < internalTaskIds.size(); i++) {
            var internalId = internalTaskIds.get(i);
            if (internalId == id.intValue()) {
                desiredInternalTaskIdIndex = i;
                break;
            }
        }

        if (desiredInternalTaskIdIndex == -1) {
            throw new NotFoundException(Task.class);
        }

        var tasks = context.find(pattern).map(e -> e.toList().get(3)).toList();
        var resultTaskNode = tasks.get(desiredInternalTaskIdIndex);
        return (ScNode) resultTaskNode;
    }

    @Override
    public List<Task> findTasksByProjectId(Long projectId) {
        return findAll().filter(t -> Objects.equals(t.getProjectId(), projectId)).toList();
    }*/
}
