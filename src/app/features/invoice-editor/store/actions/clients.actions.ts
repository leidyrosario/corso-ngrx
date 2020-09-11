import { Client } from "./../../../../model/client";
import { createAction, props } from "@ngrx/store";

export const loadClients = createAction(
    '[Client] load'
);

export const loadClientSuccess = createAction(
    '[Client] load success',
    props<{clients: Client[]}>()
);

export const loadClientFailed = createAction(
    '[Client] load failed'
);

export const addClient = createAction(
    '[Client] add',
    props<{client: Client}>()
);

export const addClientSuccess = createAction(
    '[Client] add success',
    props<{client: Client}>()
);

export const addClientFailed = createAction(
    '[Client] add failed'
);

export const editClient = createAction(
    '[Client] Edit',
    props<{client: Client}>()
);

export const editClientSuccess = createAction(
    '[Client] Edit success',
    props<{client: Client}>()
);

export const editClientFailed = createAction(
    '[Client] Edit failed'
);
