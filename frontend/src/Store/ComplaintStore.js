export class Complaint {
  id = Math.random.toString();
  name;

  constructor(name) {
    this.name = name;
  }
}

export const ComplaintStore = () => {
  return {
    complaints: [new Complaint('legacy code is a pain')],

    get complaintByLength() {
      return this.complaints.sort((a, b) => a.name.length - b.name.length);
    },

    get complaintCount() {
      return this.complaints.length;
    },

    addComplaint(name) {
      this.complaints.push(new Complaint(name));
    },
  };
};

// export type ComplaintStoreT = ReturnType<typeof ComplaintStore>;
