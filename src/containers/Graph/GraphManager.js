export default class GraphManager {
  static myInstance = null
  _graphInstance = -1

  /**
   * @returns {GraphManager}
   */
  static getInstance () {
    if (GraphManager.myInstance == null) {
      GraphManager.myInstance = new GraphManager()
    }

    return this.myInstance
  }

  addGraph () {
    this._graphInstance++
    return this._graphInstance
  }
}
