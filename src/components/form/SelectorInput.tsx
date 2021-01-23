import * as React from 'react';
import { useRef, useState } from 'react';

const style = require('./selectorInput.css').default;

type OptionType = {
  id: number;
  taskName: string;
};

interface SelectorType
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  options?: OptionType[];
  htmlFor?: string;
}

function filterOptions<T>(
  options: T[],
  accessor: (option: T) => string,
  inputStr: string
): T[] {
  const format = (s: string) => s.trim().toLowerCase();
  const filter = format(inputStr);
  return options.filter((option: T) => {
    const opt = accessor(option);
    return format(opt).indexOf(filter) >= 0;
  });
}

/*
 * The live region is for screen readers to know the number of items
 * currently being shown.
 *
 * Implementation based heavily on: https://adamsilver.io/articles/building-an-accessible-autocomplete-control/
 */
function SelectorInput({
  label,
  options: optionsUnfiltered = [],
  htmlFor,
  ...inputProps
}: SelectorType) {
  const textBoxRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  // The index of the currently selected option
  const [selectedOption, setSelectedOption] = useState(-1);
  const [options, setOptions] = useState(optionsUnfiltered);

  // Handles filtering the possible options
  const onTextBoxType = () => {
    const inputString = textBoxRef?.current?.value;
    // only show options if user typed something
    if (inputString != null && inputString.trim().length >= 0) {
      // set options based on filter
      const optionsFiltered = filterOptions(
        optionsUnfiltered,
        (opt) => opt.taskName,
        inputString
      );
      setOptions(optionsFiltered);
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  // Selects the given option and updates the input
  const selectOption = (optionIndex: number) => {
    if (textBoxRef.current?.value != null && optionIndex < options.length) {
      textBoxRef.current.value = options[optionIndex].taskName;
      setExpanded(false);
    }
  };

  // Handles accessibility using keys and screen readers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'LEFT':
      case 'RIGHT':
      case 'SPACE':
      case 'TAB':
      case 'SHIFT':
        // ignore otherwise the menu will show
        break;
      case 'Escape':
        setExpanded(false);
        break;
      case 'ArrowUp':
        setSelectedOption(Math.max(selectedOption - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        selectOption(selectedOption);
        break;
      case 'ArrowDown':
        setSelectedOption(Math.min(selectedOption + 1, options.length - 1));
        break;
      default:
        onTextBoxType();
    }
  };

  return (
    <div className={style.wrapper}>
      <label className={style.autocomplete} htmlFor={htmlFor}>
        {label}
        <input
          aria-autocomplete="list"
          aria-controls="autocomplete-options"
          aria-expanded={expanded}
          autoComplete="off"
          role="combobox"
          ref={textBoxRef}
          {...inputProps}
          className={`${style.textfield ?? ''} ${inputProps.className ?? ''}`}
          onBlur={() => setExpanded(false)}
          onChange={onTextBoxType}
          onFocus={onTextBoxType}
          onKeyDown={handleKeyDown}
        />
        {options.length > 0 ? (
          <ul
            className={expanded ? style.option_list : 'visually-hidden'}
            id="autocomplete-options"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                aria-selected={index === selectedOption}
                className={style.option}
                data-option-value={option.id}
                key={option.id}
                tabIndex={-1}
                role="option"
                value={option.id}
                onMouseEnter={() => setSelectedOption(index)}
              >
                {option.taskName}
              </li>
            ))}
            {/* Live Region for screen readers */}
            <div aria-live="polite" role="status" className="visually-hidden">
              {`${options.length} results available.`}
            </div>
          </ul>
        ) : null}
      </label>
    </div>
  );
}

SelectorInput.defaultProps = {
  options: [],
  htmlFor: 'task-subtasks',
};

export default SelectorInput;
