import React, { useReducer } from 'react';

import {
  IssueRepeatDetailViewModel,
  IssueRepeatViewModel
} from '@/types/Stats';

import IssueRepeats from './IssueRepeats';

import callApi from '@/utils/callApi';
import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

import { TopIssueRepeatActionType, reducer } from './reducer';

import styles from './index.module.css';

interface TopIssueRepeatsProps {
  data: IssueRepeatViewModel[];
}

export default function TopIssueRepeats(props: TopIssueRepeatsProps) {
  const headerLabelId = `info_topRepeatedIssues`;

  const [state, dispatch] = useReducer(reducer, {
    repeats: new Map<number, IssueRepeatDetailViewModel[]>([])
  });

  async function onShowRepeats(issueId: number) {
    const data = await callApi<IssueRepeatDetailViewModel[]>(
      `/api/stats/issueRepeatDetail/${issueId}`
    );

    dispatch({
      type: TopIssueRepeatActionType.LOAD_REPEATS,
      key: issueId,
      data
    });
  }

  // TODO
  // 1) Add a subtable beneath row on click
  //    > subtable will show each read history information
  // 2) Add a load more button beneath the table

  return (
    <section className={styles.topIssueRepeats}>
      <header className="header">
        <h2>Top Repeated Issues</h2>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader} aria-labelledby={headerLabelId}>
              <p id={headerLabelId} className="sr-only">
                Number
              </p>
              <span aria-hidden={true}>#</span>
            </th>
            <th className={classNames(styles.tableHeader, styles.lhs)}>
              Issue
            </th>
            <th className={styles.tableHeader}>Repeats</th>
            <th className={styles.tableHeader}>Last Read Date</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((x, i) => {
            const repeats = state.repeats.get(x.issueId);
            const issueNumber = getFormattedIssueNumber({
              number: x.issueNumber,
              isAnnual: x.isAnnual
            });

            return (
              <React.Fragment key={x.issueId}>
                <tr>
                  <td className={styles.tableCell} data-column-title="#">
                    {`${i + 1}`.padStart(2, '0')}
                  </td>
                  <td
                    className={classNames(styles.tableCell, styles.lhs)}
                    data-column-title="Issue"
                  >
                    <div className={styles.text} data-tooltip={x.issueName}>
                      {x.titleName} {issueNumber}
                    </div>
                    <div className={styles.text}>
                      <span className={styles.date}>{x.issueCoverDate}</span>
                      {x.isAnnual && (
                        <span className="muted">(Annual)</span>
                      )}{' '}
                      {x.isOneShot && <span className="muted">(One Shot)</span>}
                    </div>
                  </td>
                  <td className={styles.tableCell} data-column-title="Repeats">
                    <button
                      className={styles.tableCellButton}
                      aria-label="Click to expand repeat details"
                      onClick={() => onShowRepeats(x.issueId)}
                    >
                      {x.instanceCount}
                    </button>
                  </td>
                  <td
                    className={styles.tableCell}
                    data-column-title="Last Read Date"
                  >
                    {x.lastReadDate}
                  </td>
                </tr>
                <IssueRepeats data={repeats} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
