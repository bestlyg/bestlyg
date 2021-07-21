var getIntersectionNode = function (headA, headB) {
  let pA = headA;
  let pB = headB;
  if (!pA || !pB) return null;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return null;
};
