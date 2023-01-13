export class UploadImage {
  fileName;
  fileType;
  base64;

  constructor(name, type, base64) {
    this.fileName = name;
    this.fileType = type;
    this.base64 = base64;
  }
}

export const ImagesStore = () => {
  return {
    images:[],

    addImage(img) {
      this.images.push(img);
    },

    updateImages(newImages) {
      this.images = newImages;
    },
  };
};
