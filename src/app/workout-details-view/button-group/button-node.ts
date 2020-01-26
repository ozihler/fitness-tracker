import {sizeOf} from "../../shared/array-utils";
import {Id} from "../../shared/id";

enum NodeType {
  MuscleGroup = 1,
  Exercise = 2,
  Set = 3
}


export class ButtonNode {

  static MAX_LEVEL: number = Object.values(NodeType).length;

  static LEVEL_CLASSES = {1: 'uk-button-secondary', 2: 'uk-button-primary', 3: 'uk-button-default'};

  constructor(private _id: Id,
              private _name: string,
              private _children: ButtonNode[],
              private _level: number) {
  }

  isLeaf(): boolean {
    return sizeOf(this._children) <= 0
  }

  hasChildren(): boolean {
    return !this.isLeaf();
  }

  numberOfChildren(): number {
    return sizeOf(this._children);
  }

  isDeepestLevel(): boolean {
    return this.level === ButtonNode.MAX_LEVEL;
  }

  get name(): string {
    return this._name;
  }

  get children(): ButtonNode[] {
    return this._children;
  }


  get level(): number {
    return this._level;
  }

  get id(): Id {
    return this._id;
  }
}
