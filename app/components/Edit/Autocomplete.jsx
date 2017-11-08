import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

/**
 * Two examples of filtering. The first uses `caseInsensitiveFilter`, the second uses `fuzzyFilter`,
 * and limits the number of results displayed using the `maxSearchResults` property.
 */
const AutoCompleteSearch = ({objects, value, onSelect, onChange, err}) => (
  <div>
    <AutoComplete
      errorText={err}
      floatingLabelText="Type 'peah', fuzzy search"
      filter={AutoComplete.fuzzyFilter}
      dataSource={objects}
      maxSearchResults={5}
      value={value}
      onUpdateInput={onChange}
      onNewRequest={onSelect}
    />
  </div>
)

export default AutoCompleteSearch
