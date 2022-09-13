//TODO: extend logic

class API {
  static BASE_LINK: string = '';
  static BASE_PARAMS = {};

  async get(endpoint: string, params: any) {
    return await fetch(`${API.BASE_LINK}${endpoint}`, {
      ...API.BASE_PARAMS,
      ...params,
    });
  }
}

export const api = new API();
