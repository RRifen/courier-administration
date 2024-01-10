export default interface DBAccessProps {
    data: object[];
    deleteHandler: (obj: object) => void;
    handleCloseErrorDelete: any;
    handleCloseUpdateModal: any;
    headers: Array<string>;
    insertHandler: (obj: object) => void;
    page: number;
    perPage: number
    searchHandler: (obj: any) => void
    setPage: (page: number) => void
    setPerPage: (perPage: number) => void
    setUpdateObj: any
    showErrorDelete: any
    showUpdateModal: any
    updateHandler: (obj: object) => void
    updateHandlerCallback: any
    updateObj: any
}

export interface DBAccessPropsCouriersU extends DBAccessProps {
    addViolationHandler: (obj: object) => any
}
