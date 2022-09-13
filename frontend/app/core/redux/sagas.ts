import {spawn, takeLatest, call, put} from '@redux-saga/core/effects';

import {PROJECT_ACTIONS, TASK_ACTIONS, USER_ACTIONS} from './actions';

const USERID = '1';

export function* rootSaga() {
  yield call(fetchData);

  yield spawn(listenUpdateUser);
  yield spawn(listenSetStatus);
  yield spawn(listenCreateProject);
  yield spawn(listenCreateTask);
  yield spawn(listenUpdateProject);
  yield spawn(listenUpdateTask);
}

const fetchProjects = async () => {
  return await fetch('v1/projects', {
    headers: {
      'Content-Type': 'application/json',
      userId: USERID,
    },
  });
};

const fetchTasks = async (): Promise<any> => {
  return await fetch('v1/tasks', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function* fetchData() {
  const projects = yield call(fetchProjects) as any;
  const tasks = yield call(fetchTasks) as any;

  const formattedTasks = tasks.map(el => [el.id, el]);

  yield put(
    USER_ACTIONS.GET_USER.COMPLETED({name: 'some name', role: 'some role'}),
  );
  yield put(PROJECT_ACTIONS.GET_PROJECTS.COMPLETED(projects));

  yield put(TASK_ACTIONS.GET_TASKS.COMPLETED(new Map(formattedTasks)));
}

function* listenUpdateUser() {
  yield takeLatest(USER_ACTIONS.UPDATE_USER.TRIGGERED, updateUserSaga);
}

function* updateUserSaga({
  payload,
}: ReturnType<typeof USER_ACTIONS.UPDATE_USER.TRIGGERED>) {
  yield put(
    USER_ACTIONS.UPDATE_USER.COMPLETED({
      name: payload.name,
      role: payload.role,
    }),
  );
}

function* listenSetStatus() {
  yield takeLatest(TASK_ACTIONS.SET_STATUS.TRIGGERED, setStatusSaga);
}

const updateTask = async ({
  taskId,
  status,
  name,
  description,
}: {
  taskId: string;
  status?: string;
  name?: string;
  description?: string;
}) => {
  return await fetch(`v1/task/${taskId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({status, name, description}),
  });
};

function* setStatusSaga({
  payload,
}: ReturnType<typeof TASK_ACTIONS.SET_STATUS.TRIGGERED>) {
  const task = yield call(updateTask, {
    taskId: payload.taskId,
    status: payload.status,
  });

  yield put(TASK_ACTIONS.SET_STATUS.COMPLETED({taskId: payload.taskId, task}));
}

function* listenCreateProject() {
  yield takeLatest(PROJECT_ACTIONS.CREATE_PROJECT.TRIGGERED, createProjectSaga);
}

const createProject = async () => {
  return await fetch('v1/project', {
    headers: {
      'Content-Type': 'application/json',
      userId: USERID,
    },
    method: 'POST',
  });
};

function* createProjectSaga() {
  const project = yield call(createProject);

  yield put(PROJECT_ACTIONS.CREATE_PROJECT.COMPLETED(project));
}

function* listenUpdateProject() {
  yield takeLatest(PROJECT_ACTIONS.UPDATE_PROJECT.TRIGGERED, updateProjectSaga);
}

const updateProject = async (params: {
  taskIds: string[];
  projectId: string;
  name?: string;
  description?: string;
}) => {
  return await fetch(`v1/task/${params.projectId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({...params}),
  });
};

function* updateProjectSaga({
  payload,
}: ReturnType<typeof PROJECT_ACTIONS.UPDATE_PROJECT.TRIGGERED>) {
  const project = yield call(updateProject, ...payload);
  yield put(
    PROJECT_ACTIONS.UPDATE_PROJECT.COMPLETED({
      ...project,
    }),
  );
}

function* listenCreateTask() {
  yield takeLatest(TASK_ACTIONS.CREATE_TASK.TRIGGERED, createTaskSaga);
}

const createTask = async ({projectId}: {projectId: string}) => {
  return await fetch('v1/task', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({projectId}),
  });
};

function* createTaskSaga({
  payload,
}: ReturnType<typeof TASK_ACTIONS.CREATE_TASK.TRIGGERED>) {
  const task = yield call(createTask, payload.projectId);

  yield put(
    TASK_ACTIONS.CREATE_TASK.COMPLETED({
      task: task,
      projectId: payload.projectId,
    }),
  );
}

function* listenUpdateTask() {
  yield takeLatest(TASK_ACTIONS.UPDATE_TASK.TRIGGERED, updateTaskSaga);
}

function* updateTaskSaga({
  payload,
}: ReturnType<typeof TASK_ACTIONS.UPDATE_TASK.TRIGGERED>) {
  const task = updateTask(...payload);
  yield put(TASK_ACTIONS.UPDATE_TASK.COMPLETED(task));
}
