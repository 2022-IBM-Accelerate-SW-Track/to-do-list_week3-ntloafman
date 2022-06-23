import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i}) ;
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate Task Test"}})
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element)
  fireEvent.change(inputTask, { target: { value: "Duplicate Task Test"}})
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element)
  const check = screen.getAllByText(/Test/i)
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i}) ;
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "No Due Date Test"}});
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i}) ;
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Delete Test"}})
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element)
  const date = Date().toLocaleString('en-US').split(" ",4).join(' ');
  const check1 = screen.getByText(/Test/i)
  expect(check1).toBeInTheDocument();
  const checkBox = screen.getByRole('checkbox')
  fireEvent.click(checkBox)
  const check2 = screen.getByText(/You have no todo's left/i)
  expect(check2).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i}) ;
  const goodDueDate = "05/30/2023";
  const badDueDate = "05/30/2000";
  fireEvent.change(inputTask, { target: { value: "Good Due Date Test"}})
  fireEvent.change(inputDate, { target: { value: goodDueDate}});
  fireEvent.click(element)
  fireEvent.change(inputTask, { target: { value: "Bad Due Date Test"}})
  fireEvent.change(inputDate, { target: { value: badDueDate}});
  fireEvent.click(element)
  const goodDueDateCheck = screen.getByTestId(/Good Due Date Test/i).style.background
  const badDueDateCheck = screen.getByTestId(/Bad Due Date Test/i).style.background
  expect(goodDueDateCheck).not.toBe(badDueDateCheck)
 });
