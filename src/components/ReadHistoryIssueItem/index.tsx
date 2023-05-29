import React from 'react';

import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistoryIssue';

import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

import ToggleForm from './ToggleForm';

import styles from './ReadHistoryIssueItem.module.css';

interface ReadHistoryIssueItemProps {
  includeHeader: boolean;
  data: ReadHistoryIssueInfoViewModel;
  onUpdate: (item: ReadHistoryIssueInfoViewModel) => void;
}

export default function ReadHistoryIssueItem(props: ReadHistoryIssueItemProps) {
  const { data: item } = props;

  return (
    <React.Fragment>
      {props.includeHeader && (
        <li
          key="HEADER"
          id={`COLLECTION_${item.collectionId}`}
          className={styles.headerItem}
        >
          <div>
            <div>
              {getCollectionFullName({
                collectionName: item.collectionName,
                collectionNumber: item.collectionNumber
              })}
            </div>
            <span className="muted">({item.publicationDate})</span>
          </div>
        </li>
      )}
      <li
        key="ITEM"
        id={`ISSUE_${item.collectionId}_${item.issueId}`}
        className={classNames(
          styles.item,
          item.collectionId && styles.itemIndented
        )}
      >
        <div>
          <div className={styles.coverInfo}>
            <div>
              {item.titleName} {getFormattedIssueNumber(item)}{' '}
              {item.isOneShot && '(One Shot)'}
            </div>
            &nbsp;
            <div>{item.coverDate}</div>
            {item.isRepeatedIssue && (
              <div
                className={styles.repeatIcon}
                title={`This issue has appeared (${
                  item.issueInstanceIndex
                } time${
                  item.issueInstanceIndex === 1 ? '' : 's'
                }) earlier in the read order.`}
              >
                <span aria-hidden={true}>&#x26a0;</span>
              </div>
            )}
          </div>
          <div className={styles.main}>
            <div>{item.name}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <div>{item.readOnDate ? item.readOnDate : ''}</div>
          <ToggleForm data={item} onSubmitSuccess={props.onUpdate} />
        </div>
      </li>
    </React.Fragment>
  );
}
