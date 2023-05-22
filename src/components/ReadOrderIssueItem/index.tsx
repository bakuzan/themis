import React from 'react';

import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';

import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

import EditForm from './EditForm';
import RemoveForm from './RemoveForm';

import styles from './ReadOrderIssueItem.module.css';

interface ReadOrderIssueItemProps {
  includeHeader: boolean;
  data: IssueWithReadOrderInfoViewModel;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

export default function ReadOrderIssueItem(props: ReadOrderIssueItemProps) {
  const { data: item } = props;

  return (
    <React.Fragment>
      {props.includeHeader && (
        <li key="HEADER" className={styles.headerItem}>
          <div>
            <div>
              {getCollectionFullName({
                collectionName: item.collectionName,
                collectionNumber: item.collectionNumber
              })}
            </div>
            <span className="muted">({item.publicationDate})</span>
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
