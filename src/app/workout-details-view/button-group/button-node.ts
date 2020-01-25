import {sizeOf} from "../../shared/array-utils";

export class ButtonNode {
  private _name: string;
  private _children: ButtonNode[];

  constructor(name: string, children: ButtonNode[]) {
    this._name = name;
    this._children = children;
  }

  isLeaf(): boolean {
    return sizeOf(this._children) <= 0
  }

  numberOfChildren(): number {
    return sizeOf(this._children);
  }

  get name(): string {
    return this._name;
  }

  get children(): ButtonNode[] {
    return this._children;
  }
}
