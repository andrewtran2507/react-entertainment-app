import { IErrorResponse, TErrors, defElm } from 'utils/constant';

export const getImageULR = (
  path: string | null | undefined,
  folder: string,
): string =>
  path
    ? `${process.env.REACT_APP_IMAGE_URL}/${folder}${path}`
    : '/assets/images/no-img.png';

export const mockMatchMedia = (): void => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
};

export const getErrorResponse = (error: TErrors): IErrorResponse => {
  let objError: IErrorResponse = {
    status_code: 2,
    status_message: 'Something when wrong!',
    success: false,
  };
  if (!error) {
    return objError;
  }
  if (error.response.data) {
    objError = error?.response?.data;
  }
  if (error?.name === 'ZodError') {
    objError.status_message =
      error?.errors
        ?.map(
          (d: { path: string[]; message: string }) =>
            `${d?.path[d?.path.length - 1]} ${d?.message}`,
        )
        .join(', ') || objError.status_message;
  }
  return objError;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const elmQuerySelector = (
  elm: Element,
  queryStr: string,
  isAll = false,
) =>
  (isAll
    ? Array.from(elm.querySelectorAll(queryStr))
    : elm.querySelector(queryStr)) || defElm;
