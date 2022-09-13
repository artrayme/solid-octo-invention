import {createReducer} from '@reduxjs/toolkit';
import {PROJECT_ACTIONS, TASK_ACTIONS, USER_ACTIONS} from './actions';

/*
task:
id
title
desc
status

project:
id
title
desc
taskIds: array
 */

export type InitialState = {
  user: {
    name: string;
    role: string;
  };
  tasks: Map<
    string,
    {
      id: string;
      title: string;
      description: string;
      status: string;
    }
  >;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    taskIds: Array<string>;
  }>;
};

const initialState: InitialState = {
  user: {
    name: '',
    role: '',
  },
  tasks: new Map(),
  projects: [],
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(USER_ACTIONS.GET_USER.COMPLETED, (state, {payload}) => {
      state.user = payload;
    })
    .addCase(PROJECT_ACTIONS.GET_PROJECTS.COMPLETED, (state, {payload}) => {
      state.projects = payload;
    })
    .addCase(TASK_ACTIONS.GET_TASKS.COMPLETED, (state, {payload}) => {
      state.tasks = payload;
    })
    .addCase(TASK_ACTIONS.SET_STATUS.COMPLETED, (state, {payload}) => {
      const taskTree = new Map(state.tasks);
      taskTree.set(payload.taskId, payload.task);

      state.tasks = taskTree;
    })
    .addCase(USER_ACTIONS.UPDATE_USER.COMPLETED, (state, {payload}) => {
      state.user.name = payload.name ? payload.name : state.user.name;
      state.user.role = payload.role ? payload.role : state.user.role;
    })
    .addCase(PROJECT_ACTIONS.CREATE_PROJECT.COMPLETED, (state, {payload}) => {
      state.projects.push(payload);
    })
    .addCase(TASK_ACTIONS.CREATE_TASK.COMPLETED, (state, {payload}) => {
      state.tasks.set(payload.task.id, payload.task);
      state.projects
        .find(project => project.id === payload.projectId)
        ?.taskIds.push(payload.task.id);
    })
    .addCase(PROJECT_ACTIONS.UPDATE_PROJECT.COMPLETED, (state, {payload}) => {
      const project = state.projects.find(
        proj => proj.id === payload.projectId,
      );
      if (!project) {
        return;
      }
      project.title = payload.projectName
        ? payload.projectName
        : project?.title;
      project.description = payload.projectDescription
        ? payload.projectDescription
        : project?.description;
    })
    .addCase(TASK_ACTIONS.UPDATE_TASK.COMPLETED, (state, {payload}) => {
      const tree = new Map(state.tasks);

      const task = tree.get(payload.taskId);
      if (!task) {
        return;
      }
      task.title = payload.taskName ? payload.taskName : task.title;
      task.description = payload.taskDescription
        ? payload.taskDescription
        : task.description;

      tree.set(payload.taskId, task);
      state.tasks = tree;
    });
});
