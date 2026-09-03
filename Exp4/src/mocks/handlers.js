import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Team Meeting",
        date: "2026-08-30",
      },
      {
        id: 2,
        title: "Project Review",
        date: "2026-08-31",
      },
      {
        id: 3,
        title: "Presentation",
        date: "2026-08-30",
      },
    ]);
  }),
];
