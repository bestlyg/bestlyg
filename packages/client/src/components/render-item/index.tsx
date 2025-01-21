import _ from "lodash";
import { useState, useEffect } from "react";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Checkbox } from "@/shadcn/ui/checkbox";

export function RandomItem() {
  const [data, setData] = useState(new Map<HTMLElement, HTMLElement[]>());
  const [checkedList, setCheckedList] = useState<string[][]>([]);
  useEffect(() => {
    const doc: HTMLElement | null = document.querySelector(".markdown-body");
    if (!doc) return;
    // let currentKey = null;
    let currentList: HTMLElement[] = [];
    const map = new Map<HTMLElement, HTMLElement[]>();
    (Array.from(doc.children) as HTMLElement[])
      .filter((dom) => {
        const tagName = dom.tagName.toLowerCase();
        return tagName === "h2" || tagName === "h3";
      })
      .forEach((dom) => {
        const tagName = dom.tagName.toLowerCase();
        if (tagName === "h2") {
          // currentKey = dom;
          currentList = [];
          map.set(dom, currentList);
        } else if (tagName === "h3") {
          currentList.push(dom);
        }
      });
    setData(map);
    setCheckedList(
      Array.from(map.values()).map((arr) => arr.map((dom) => dom.innerText))
    );
  }, []);
  const [cur, setCur] = useState<any>(null);
  // console.log({ data, checkedList, cur });
  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {cur?.[0]?.innerText} - {cur?.[1]?.innerText}
      </h2>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            const dataToArr = Array.from(data.entries());
            const picked = _.sample(
              dataToArr.filter((_, index) => {
                return checkedList[index].length;
              })
            )!;
            const index = dataToArr.indexOf(picked);
            setCur([
              picked[0],
              _.sample(
                picked[1].filter((dom) => {
                  return checkedList[index].includes(dom.innerText);
                })
              ),
            ]);
          }}
        >
          Random
        </Button>
        <Button
          onClick={() => {
            cur?.[1]?.scrollIntoView?.({ behavior: "smooth" });
          }}
        >
          Go
        </Button>
      </div>
      {Array.from(data.entries()).map(([dom, children], index) => {
        const options = children.map((dom) => dom.innerText);
        return (
          <div key={index} className="w-full">
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={dom.innerText}
                  onCheckedChange={(e) => {
                    const newCheckedList = [...checkedList];
                    newCheckedList[index] = e ? options : [];
                    setCheckedList(newCheckedList);
                  }}
                  checked={
                    checkedList[index].length > 0 &&
                    checkedList[index].length < options.length
                      ? "indeterminate"
                      : options.length === checkedList[index].length
                  }
                />
                <label
                  htmlFor={dom.innerText}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dom.innerText}
                </label>
              </div>

              {options.map((v) => {
                return (
                  <div className="flex items-center space-x-2" key={v}>
                    <Checkbox
                      id={v}
                      onCheckedChange={(e) => {
                        const newCheckedList = [...checkedList];
                        newCheckedList[index] = newCheckedList[index].filter(
                          (c) => v !== c
                        );
                        if (e) newCheckedList[index].push(v);
                        setCheckedList(newCheckedList);
                      }}
                      checked={checkedList[index].includes(v)}
                    />
                    <label
                      htmlFor={v}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {v}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
