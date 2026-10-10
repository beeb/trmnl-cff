// keep only what the template reads, the raw response is too large for TRMNL
function transform(input) {
  return {
    messages: input.messages,
    connections: (input.connections ?? []).map(c => {
      const rides = c.legs.filter(l => l.type && l.type !== "walk");
      const first = rides[0] ?? {};
      return {
        departure: c.departure,
        arrival: c.arrival,
        dep_delay: c.dep_delay,
        arr_delay: c.arr_delay,
        duration: c.duration,
        line: first["*G"] ? `${first["*G"]}${first["*L"] ?? ""}` : first.line,
        terminal: first.terminal,
        track: first.track || undefined,
        rides: rides.length,
        disrupted: rides.some(l => Object.keys(l.disruptions ?? {}).length > 0) || undefined,
      };
    }),
  };
}
