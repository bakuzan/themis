import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { IssueViewModel } from '@/types/Issue';

import IssueForm from './Forms/IssueForm';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

import styles from './IssueItem.module.css';

interface IssueItemProps {
  data: IssueViewModel;
}

export default function IssueItem(props: IssueItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const item = props.data;
  const issueNumber = getFormattedIssueNumber(item);

  function onEdit(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsEditing(true);
  }

  return (
    <li className={styles.item}>
      {isEditing ? (
        <IssueForm
          method="PUT"
          action={`/api/issues/${item.id}`}
          data={item}
          onSuccess={() => {
            refreshData();
            setIsEditing(false);
          }}
        />
      ) : (
        <React.Fragment>
          <div className={styles.coverInfo}>
            <div>
              {issueNumber} {item.isAnnual && 'Annual'}
            </div>
            &nbsp;
            <div>{item.coverDate}</div>
          </div>
          <div className={styles.main}>
            <div>{item.name}</div>
            <div>
              <Link href={`/issues/${item.id}/edit`} onClick={onEdit}>
                Edit
              </Link>
            </div>
          </div>
        </React.Fragment>
      )}
    </li>
  );
}
