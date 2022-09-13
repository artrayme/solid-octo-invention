import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {InitialState} from './reducer';

const selectSelf = (state: InitialState) => state;
export const getUser = createDraftSafeSelector(selectSelf, state => state.user);
export const getProjects = createDraftSafeSelector(
  selectSelf,
  state => state.projects,
);
export const getProjectById = (state: InitialState, projectId: string) =>
  createDraftSafeSelector(getProjects, projects =>
    projects.filter(project => project.id === projectId),
  )(state);
export const getTasks = createDraftSafeSelector(
  selectSelf,
  state => state.tasks,
);
export const getTaskById = (state: InitialState, taskId: string) =>
  createDraftSafeSelector(getTasks, tasks => tasks.get(taskId))(state);
