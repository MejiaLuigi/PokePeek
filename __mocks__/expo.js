export const EventEmitter = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  emit: jest.fn(),
};

export default {
  EventEmitter,
};