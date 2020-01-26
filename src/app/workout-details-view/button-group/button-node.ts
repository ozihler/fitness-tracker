import {sizeOf} from "../../shared/array-utils";
import {Id} from "../../shared/id";

export class ButtonNode {
  static MAX_LEVEL: number = 3;

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
