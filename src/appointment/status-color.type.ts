export type StatusColor = {
  [key: string]: string;
};

const statusColor: StatusColor = {
  CONFIRMED: "bg-green-300",
  CANCELED: "bg-red-300",
  PENDING: "bg-yellow-300",
};
export const getStatusColor = (status: string) => statusColor[status];
