const fetcher = <T = any>(url: string): Promise<T> =>
  fetch(url).then((response) => response.json());

export default fetcher;
