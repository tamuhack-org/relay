import { ListMember, MailingList } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const mailingListId = router.query.mailingListId;
  
  const [mailingList, setMailingList] = useState<MailingList | null>(null);
  const [listMembers, setListMembers] = useState<ListMember[]>([]);
  const [failedToFetchMailingList, setFailedToFetchMailingList] = useState(false);
  const [failedToFetchListMembers, setFailedToFetchListMembers] = useState(false);

  useEffect(() => {
    if (!mailingListId) {
      return;
    }
    async function fetchMailingList() {
      const response = await fetch(`/api/mailing-list/${mailingListId}`);
      if (!response.ok) {
        setFailedToFetchMailingList(true);
        return;
      }
      const responseData = await response.json();
      setMailingList(responseData.mailingList);
    }
    async function fetchListMembers() {
      const response = await fetch(`/api/mailing-list/${mailingListId}/members`);
      if (!response.ok) {
        setFailedToFetchListMembers(true);
        return;
      }
      const responseData = await response.json();
      setListMembers(responseData.listMembers);
    }
    fetchMailingList();
    fetchListMembers();
  }, [mailingListId]);

  return (
    <>
      <h1 className="text-4xl">Mailing List</h1>
      {failedToFetchMailingList && (
        <div>Failed to fetch mailing list</div>
      )}
      {failedToFetchListMembers && (
        <div>Failed to fetch list members</div>
      )}
      {mailingList ? (
        <div>
          <h2>{mailingList.name}</h2>
          <p>{mailingList.description}</p>
          <ul>
            {listMembers.map((listMember) => (
              <li key={listMember.id}>{listMember.email}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
