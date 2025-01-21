import _ from "lodash";
import { dynamicIconImports, DynamicIcon } from "lucide-react/dynamic";
import React from "react";

export function RandomIcon(props: Partial<Parameters<typeof DynamicIcon>[0]>) {
  const nameRef = React.useRef(
    _.sample(Object.keys(dynamicIconImports)) as keyof typeof dynamicIconImports
  );
  return <DynamicIcon name={nameRef.current} {...props} />;
}
