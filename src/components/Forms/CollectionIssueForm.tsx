import { FormEvent, useContext, useState } from 'react';

import { CollectionIssueViewModel } from '@/types/CollectionIssue';
import { CollectionIssueResponse } from '@/types/Response';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import InputSelect from '@/components/InputSelect';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

interface CollectionIssueFormProps {
  method: string;
  action: string;
  data: Partial<CollectionIssueViewModel>;
  issues: IssueWithTitleInfoViewModel[];
  onSuccess: () => void;
}

export default function CollectionIssueForm(props: CollectionIssueFormProps) {
  const appProps = useContext(AppContext);
  const { data } = props;
  const [issueIds, setIssueIds] = useState(new Set<number>([]));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      collectionId: data.collectionId,
      issueIds: Array.from(issueIds.values())
    };

    const response = await callApi<CollectionIssueResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      props.onSuccess();
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="collectionIssueForm"
        name="collectionIssueForm"
        onSubmit={handleSubmit}
      >
        <Input
          type="hidden"
          id="collectionId"
          name="collectionId"
          value={data.collectionId}
        />
        <InputSelect
          id="issueIds"
          name="issueIds"
          label="Issue(s)"
          required
          multiple
          value={Array.from(issueIds.values()).map((x) => `${x}`)}
          onChange={(e) => {
            const value = Number(e.currentTarget.value);
            let ids = new Set(issueIds);

            if (!ids.delete(value)) {
              ids.add(value);
            }

            setIssueIds(ids);

            /**
             * If the multiple select is not blurred after selecting an item
             * the control will fire the onChange event when scrolling (retarded).
             * To prevent this, we need to blur and refocus the control.
             */
            const element = document.activeElement as HTMLSelectElement;
            if (element) {
              requestAnimationFrame(() => element.blur());
              requestAnimationFrame(() => element.focus());
            }
          }}
        >
          {props.issues.map((x) => (
            <option key={x.id} value={x.id}>
              {x.titleName} ({x.startYear}) {getFormattedIssueNumber(x)}{' '}
              {x.isAnnual && '(Annual)'} {x.isOneShot && '(One Shot)'}
            </option>
          ))}
        </InputSelect>

        <ButtonGroup>
          <Button type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
