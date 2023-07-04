import classcat, { Class } from "classcat";

export default function cc(...names: Class[]) {
  return classcat([names]);
}
