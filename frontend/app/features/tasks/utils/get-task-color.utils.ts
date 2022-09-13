import {colors} from '../../../common/constants/colors';
import {TASK_STATUSES} from '../../../common/types/task-status.type';

export const getTaskColor = (
  status: TASK_STATUSES,
): {tint: string; secondary: string} => {
  switch (status) {
    case TASK_STATUSES.BACKLOG:
      return {tint: colors.backlogTint, secondary: colors.backlogSecondary};
    case TASK_STATUSES.IN_PROGRESS:
      return {
        tint: colors.inProgressTint,
        secondary: colors.inProgressSecondary,
      };
    case TASK_STATUSES.IN_REVIEW:
      return {tint: colors.inReviewTint, secondary: colors.inReviewSecondary};
    case TASK_STATUSES.DONE:
      return {tint: colors.doneTint, secondary: colors.doneSecondary};
    default:
      return {tint: '', secondary: ''};
  }
};
