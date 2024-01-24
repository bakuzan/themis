import React from 'react';

import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';

import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

import EditForm from './EditForm';
import RemoveForm from './RemoveForm';
import ItemAnchorLink from '../ItemAnchorLink';

import styles from './ReadOrderIssueItem.module.css';

interface ReadOrderIssueItemProps {
  includeHeader: boolean;
  data: IssueWithReadOrderInfoViewModel;
  countMap: Map<number | null, number>;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

export default function ReadOrderIssueItem(props: ReadOrderIssueItemProps) {
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

          <div className={styles.actions}>
            <EditForm
              canUp={!props.isFirst}
              canDown={!props.isLast}
              readOrderId={props.data.readOrderId}
              collectionId={props.data.collectionId}
              onSubmitSuccess={props.onEdit}
            />
            <RemoveForm data={props.data} onSubmitSuccess={props.onRemove} />
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
            <div>{item.coverDate}</div>
          </div>
          <div className={styles.main}>
            <div>{item.name}</div>
          </div>
        </div>
        {!item.collectionId && (
          <div className={styles.actions}>
            <EditForm
              canUp={!props.isFirst}
              canDown={!props.isLast}
              readOrderId={props.data.readOrderId}
              collectionId={props.data.collectionId}
              issueId={props.data.issueId}
              onSubmitSuccess={props.onEdit}
            />

            <RemoveForm data={props.data} onSubmitSuccess={props.onRemove} />
          </div>
        )}
      </li>
    </React.Fragment>
  );
}
