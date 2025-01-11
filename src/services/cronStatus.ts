export let cronStatus = {
  status: "Initialized",
  lastRun: null as Date | null,
  nextRun: null as Date | null,
  error: null as string | null,
};

export const updateCronStatus = (
  status: string,
  lastRun: Date | null,
  nextRun: Date | null,
  error: string | null
) => {
  cronStatus = { status, lastRun, nextRun, error };
};
