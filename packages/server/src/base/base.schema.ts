export const baseSchema = {
  createTime: {
    type: Date,
    default: () => new Date(),
  },
  updateTime: {
    type: Date,
    default: () => new Date(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
};