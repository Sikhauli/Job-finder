import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectedUser = createSelector(
    [selectAuth],
    (auth) => auth.currentUser
);
