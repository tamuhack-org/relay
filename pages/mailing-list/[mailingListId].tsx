import { ListMember, MailingList } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const mailingListId = router.query.mailingListId;
  
  const [mailingList, setMailingList] = useState<MailingList | null>(null);
  const [listMembers, setListMembers] = useState<ListMember[]>([]);
  const [failedToFetchTemplate, setFailedToFetchTemplate] = useState(false);

  useEffect(() => {
    if (!mailingListId) {
      return;
    }
    async function fetchMailingList() {
      const response = await fetch(`/api/mailing-list/${mailingListId}`);
      if (!response.ok) {
        setFailedToFetchTemplate(true);
        return;
      }
      const responseData = await response.json();
      setMailingList(responseData.mailingList);
      setListMembers(responseData.listMembers);
    }
    fetchMailingList();
  }, [mailingListId]);

}
