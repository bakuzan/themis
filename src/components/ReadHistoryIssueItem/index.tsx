import React from 'react';

import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistoryIssue';

import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

import ItemAnchorLink from '../ItemAnchorLink';
import ToggleForm from './ToggleForm';

import styles from './ReadHistoryIssueItem.module.css';

interface ReadHistoryIssueItemProps {
  includeHeader: boolean;
  data: ReadHistoryIssueInfoViewModel;
  countMap: Map<number | null, number>;
  onUpdate: (item: ReadHistoryIssueInfoViewModel) => void;
}

export default function ReadHistoryIssueItem(props: ReadHistoryIssueItemProps) {
  const { data: item } = props;
  const hasCollectionId = !!item.collectionId;

  const headerId = `COLLECTION_${item.collectionId}`;
  const itemId = `ISSUE_${item.collectionId ?? ''}_${item.issueId}`;
  const itemHashId = hasCollectionId ? headerId : itemId;

  return (
    <React.Fragment>
      {props.includeHeader && (
        <li key="HEADER" id={headerId} className={styles.headerItem}>
          <ItemAnchorLink hashId={itemHashId} />
          <div className={styles.headerItemInner}>
            <div>
              {getCollectionFullName({
                collectionName: item.collectionName,
                collectionNumber: item.collectionNumber
              })}
            </div>
            <span className="muted">({item.publicationDate})</span>
            <span className="muted">
              ({props.countMap.get(item.collectionId)} issues)
            </span>
          </div>
        </li>
      )}
      <li
        key="ITEM"
        id={itemId}
        className={classNames(
          styles.item,
          hasCollectionId && styles.itemIndented
        )}
      >
        {!hasCollectionId && <ItemAnchorLink hashId={itemHashId} />}
        <div className={styles.itemInner}>
          <div className={styles.coverInfo}>
            <div>
              {item.titleName} {getFormattedIssueNumber(item)}{' '}
              {item.isOneShot && '(One Shot)'}
            </div>
            &nbsp;
            <div className={styles.noSelect}>{item.coverDate}</div>
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
