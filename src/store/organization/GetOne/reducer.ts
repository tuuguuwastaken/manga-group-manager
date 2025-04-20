import { createAction, createReducer } from "@reduxjs/toolkit";
import { CustomDocumentType } from "../../../types/firebase";
import { RootState } from "../../states";
import { OrganizationType } from "../../../types/organization";

export interface OrganizationOneState {
    error?: string | null;
    loading: boolean;
    data?: CustomDocumentType<OrganizationType> | null;
}

const initialState: OrganizationOneState = {
    error: null,
    loading: false,
}

export const selectOrganizationOneState = (state: RootState): OrganizationOneState => state.organizationOne;

export const organizationOneInitial = createAction("ORGANIZATION_ONE_INITIAL");
export const organizationOneRequest = createAction<{id: string}>("ORGANIZATION_ONE_REQUEST");
export const organizationOneRequestSuccess = createAction<CustomDocumentType<OrganizationType>>("ORGANIZATION_ONE_SUCCESS");
export const organizationOneRequestError = createAction<string>("ORGANIZATION_ONE_ERROR");

const organizationOneReducer = createReducer(initialState, (builder) => {
    builder.addCase(organizationOneInitial, (state) => {
        Object.assign(state, {error: null, loading: false, data: null} as OrganizationOneState)
    })
    builder.addCase(organizationOneRequest, (state) => {
        Object.assign(state, {error: null, loading: true, data: null} as OrganizationOneState)
    })
    builder.addCase(organizationOneRequestSuccess, (state, action) => {
        console.log("ORG ONE", action.payload)
        Object.assign(state, {error: null, loading: false, data: action.payload} as OrganizationOneState)
    })
    builder.addCase(organizationOneRequestError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false} as OrganizationOneState)
    })
});

export default organizationOneReducer;