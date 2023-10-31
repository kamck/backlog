interface Playthrough {
  title: string;
  platform: string;
}

export function getAll(): Promise<Response> {
  return fetch("/api");
}

export function create(playthrough: Playthrough): Promise<Response> {
  return fetch("/api", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(playthrough),
  });
}

export function update(
  id: number,
  playthrough: Playthrough,
): Promise<Response> {
  return fetch(`/api/${id}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(playthrough),
  });
}
