import sinon from "sinon";

export const mockRequest = (requestHeader) => {
    return requestHeader;
};
export const mockResponse2 = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

export const mockResponse = (res = {}) => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    return res;
};
export const mockNext = () => {
    return jest.fn();
};