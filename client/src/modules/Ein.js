class Ein {
  static setEin(ein) {
    localStorage.setItem('ein', ein);
  }
  static isEinExist() {
    return localStorage.getItem('ein') !== null;
  } 
  static removeEin() {
    localStorage.removeItem('ein');
  }
  static getEin() {
    return localStorage.getItem('ein');
  }
}

export default Ein;