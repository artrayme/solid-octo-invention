import java.net.URI;
import java.util.stream.Stream;

import org.ostis.api.context.DefaultScContext;
import org.ostis.scmemory.model.element.edge.EdgeType;
import org.ostis.scmemory.model.element.edge.ScEdge;
import org.ostis.scmemory.model.element.link.LinkType;
import org.ostis.scmemory.model.element.link.ScLink;
import org.ostis.scmemory.model.element.link.ScLinkString;
import org.ostis.scmemory.model.element.node.NodeType;
import org.ostis.scmemory.model.element.node.ScNode;
import org.ostis.scmemory.model.exception.ScMemoryException;
import org.ostis.scmemory.model.pattern.factory.DefaultScPattern5Factory;
import org.ostis.scmemory.model.pattern.pattern5.ScConstruction5;
import org.ostis.scmemory.model.pattern.pattern5.ScPattern5;
import org.ostis.scmemory.websocketmemory.memory.SyncOstisScMemory;
import org.ostis.scmemory.websocketmemory.memory.pattern.DefaultWebsocketScPattern;
import org.ostis.scmemory.websocketmemory.memory.pattern.SearchingPatternTriple;
import org.ostis.scmemory.websocketmemory.memory.pattern.element.AliasPatternElement;
import org.ostis.scmemory.websocketmemory.memory.pattern.element.FixedPatternElement;
import org.ostis.scmemory.websocketmemory.memory.pattern.element.TypePatternElement;

public class MemoryManagerExample {
    private final DefaultScContext context;
    private final ScNode nrel_user_id;
    private final ScNode nrel_username;
    private final ScNode nrel_uni_name;
    private final ScNode nrel_uni_students_count;
    private final ScNode rrel_student;
    private final ScNode class_student;
    private final ScNode class_university;

    public MemoryManagerExample(DefaultScContext context) throws ScMemoryException {
        this.context = context;
        nrel_user_id = context.resolveKeynode("nrel_user_id", NodeType.CONST_NO_ROLE);
        nrel_username = context.resolveKeynode("nrel_username", NodeType.CONST_NO_ROLE);
        nrel_uni_name = context.resolveKeynode("nrel_uni_name", NodeType.CONST_NO_ROLE);
        nrel_uni_students_count = context.resolveKeynode("nrel_uni_students_count", NodeType.CONST_NO_ROLE);
        rrel_student = context.resolveKeynode("rrel_student", NodeType.CONST_ROLE);
        class_student = context.resolveKeynode("student", NodeType.CONST_CLASS);
        class_university = context.resolveKeynode("university", NodeType.CONST_CLASS);
    }

    public static void main(String[] args) throws Exception {
        SyncOstisScMemory memory = new SyncOstisScMemory(new URI("ws://localhost:8090/ws_json"));
        memory.open();
        var mm = new MemoryManagerExample(new DefaultScContext(memory));
        mm.createUser("Artemy", 1);
        var pavel = mm.createUser("Pavel", 2);
        mm.createUser("Jesse", 4);
        var variety = mm.createUser("Variety", 4);
        var bsuir = mm.createUniversity("BSUIR", 15000);
        mm.makeUserStudent(pavel, bsuir);
        mm.makeUserStudent(variety, bsuir);
        System.out.println(mm.getUniversityName(bsuir));
        System.out.println(mm.getAllStudentNamesFromUniversity2(bsuir).toList());
        memory.close();
    }

    public ScNode createUser(String name, Integer id) throws ScMemoryException {
        ScNode user = context.createNode(NodeType.CONST);
        context.createEdge(EdgeType.ACCESS, class_student, user);
        ScEdge userIdEdge = context.createEdge(EdgeType.D_COMMON_CONST, user, context.createIntegerLink(LinkType.LINK_CONST, id));
        context.createEdge(EdgeType.ACCESS, nrel_user_id, userIdEdge);
        ScEdge usernameEdge = context.createEdge(EdgeType.D_COMMON_CONST, user, context.createStringLink(LinkType.LINK_CONST, name));
        context.createEdge(EdgeType.ACCESS, nrel_username, usernameEdge);
        return user;
    }

    public ScNode createUniversity(String name, Integer studentsCount) throws ScMemoryException {
        ScNode university = context.createNode(NodeType.CONST);
        context.createEdge(EdgeType.ACCESS, class_university, university);
        ScEdge studentsCountEdge = context.createEdge(EdgeType.D_COMMON_CONST, university, context.createIntegerLink(LinkType.LINK_CONST, studentsCount));
        context.createEdge(EdgeType.ACCESS, nrel_uni_students_count, studentsCountEdge);
        ScEdge uninameEdge = context.createEdge(EdgeType.D_COMMON_CONST, university, context.createStringLink(LinkType.LINK_CONST, name));
        context.createEdge(EdgeType.ACCESS, nrel_uni_name, uninameEdge);
        return university;
    }

    public void makeUserStudent(ScNode user, ScNode university) throws ScMemoryException {
        var edge = context.createEdge(EdgeType.D_COMMON_CONST, user, university);
        context.createEdge(EdgeType.ACCESS, rrel_student, edge);
    }

    public String getUniversityName(ScNode university) throws ScMemoryException {
        ScPattern5<ScNode, LinkType, ScNode, ScLink, ScNode> findAllStudents = DefaultScPattern5Factory.get(university, EdgeType.D_COMMON, LinkType.LINK_VAR, EdgeType.ACCESS, nrel_uni_name);
        var result = context.find(findAllStudents);
        return result
                .map(ScConstruction5::get3)
                .map(e->((ScLinkString)e).getContent())
                .findFirst()
                .get();
    }

    public Stream<String> getAllStudentNamesFromUniversity2(ScNode university) throws ScMemoryException {
        var pattern = new DefaultWebsocketScPattern();
        var studentEdgeAlias = new AliasPatternElement("studentEdge");
        var studentNameEdgeAlias = new AliasPatternElement("studentNameEdge");
        var studentNodeAlias = new AliasPatternElement("studentNode");
        pattern.addElement(new SearchingPatternTriple(
                new TypePatternElement<>(NodeType.VAR, studentNodeAlias),
                new TypePatternElement<>(EdgeType.D_COMMON_VAR, studentEdgeAlias),
                new FixedPatternElement(university)
        ));
        pattern.addElement(new SearchingPatternTriple(
                new FixedPatternElement(rrel_student),
                new TypePatternElement<>(EdgeType.ACCESS, new AliasPatternElement("abc")),
                studentEdgeAlias
        ));
        pattern.addElement(new SearchingPatternTriple(
                studentNodeAlias,
                new TypePatternElement<>(EdgeType.D_COMMON_VAR, studentNameEdgeAlias),
                new TypePatternElement<>(LinkType.LINK_VAR, new AliasPatternElement("cde"))
        ));
        pattern.addElement(new SearchingPatternTriple(
                new FixedPatternElement(nrel_username),
                new TypePatternElement<>(EdgeType.ACCESS, new AliasPatternElement("fgh")),
                studentNameEdgeAlias
        ));
        return context.find(pattern).map(e -> ((ScLinkString) e.toList().get(8)).getContent());
    }
}