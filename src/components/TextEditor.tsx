import { Component } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { convertToHTML } from "draft-convert";

import parse from "html-react-parser";
interface TextEditorProps {}
interface TextEditorState {
  editText: string;
  editorState: EditorState;
  isActive: boolean;
  editorData: { id: number; text: string }[];
}

const content = {
  entityMap: {},
  blocks: [
    {
      key: "",
      text: "",
      type: "",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
class TextEditor extends Component<TextEditorProps, TextEditorState> {
  constructor(props: TextEditorProps) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      editText: "",
      editorState: EditorState.createWithContent(contentState),
      isActive: false,
      editorData: [],
    };
  }

  handleClickAction = () => {
    const { editorState } = this.state;
    const html = convertToHTML(editorState.getCurrentContent());
    const newData = { id: Date.now(), text: html };
    this.setState({ editorData: [...this.state.editorData, newData] });
    this.setState({
      editText: html,
      isActive: true,
      editorState: EditorState.createEmpty(),
    });
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };
  handleDelete = (itemId: number) => {
    const newData = this.state.editorData.filter((item) => item.id !== itemId);
    this.setState({ editorData: newData });
  };
  render() {
    const { editorState, isActive } = this.state;

    return (
      <Box sx={styles.mainComponent}>
        <Box sx={styles.textMainContainer}>
          <Paper elevation={4} sx={styles.textContainer}>
            <Typography sx={styles.termsText}> Rich Text Editor </Typography>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              readOnly={false}
              placeholder="The text goes here..."
              toolbarOnFocus={false}
              toolbar={{
                fontSize: {
                  options: [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 24, 30,
                    36, 48, 60, 72, 96,
                  ],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                },
              }}
              mention={{
                separator: " ",
                trigger: "@",
                suggestions: [
                  { text: "APPLE", value: "apple", url: "apple" },
                  { text: "BANANA", value: "banana", url: "banana" },
                  { text: "CHERRY", value: "cherry", url: "cherry" },
                  { text: "DURIAN", value: "durian", url: "durian" },
                  { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                  { text: "FIG", value: "fig", url: "fig" },
                  {
                    text: "GRAPEFRUIT",
                    value: "grapefruit",
                    url: "grapefruit",
                  },
                  { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
                ],
              }}
            />
            <Box>
              <Button
                variant="contained"
                sx={styles.saveButton}
                onClick={this.handleClickAction}
                data-testid="Add"
              >
                Add
              </Button>
            </Box>
          </Paper>
        </Box>
        <Paper
          sx={{
            width: "500px",
            overflow: "auto",
          }}
        >
          {isActive &&
            this.state.editorData.map((item) => (
              <Paper
                sx={{
                  pb: 10,
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
                key={item.id}
              >
                <Box data-testid="item-text" sx={{ p: 1 }}>
                  {parse(item.text)}
                </Box>
                <Button
                  sx={styles.saveButton}
                  onClick={() => this.handleDelete(item.id)}
                  data-testid="delete"
                >
                  Delete
                </Button>
              </Paper>
            ))}
        </Paper>
      </Box>
    );
  }
}

export default TextEditor;
const styles = {
  mainComponent: {
    display: "flex",
    justifyContent: "space-around",
    width: "99.8%",
    height: "100vh",
  },
  addTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "40px",
  },
  addText: {
    fontSize: "40px",
    fontWeight: "600",
    fontFamily: "Inter, sans-serif",
    lineHeight: "30px",
    textAlign: "center",
    textShadow: "2px 4px 2px #ccc",
  },
  termsText: {
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "Inter, sans-serif",
    lineHeight: "30px",
  },
  addButton: {
    color: "#fff",
    background: "#ee556a",
    borderRadius: "30px",
    p: "12px 30px",
    "&:hover": {
      background: "#ee556a",
    },
    textTransform: "none",
  },
  saveButton: {
    color: "#fff",
    background: "#ee556a",
    borderRadius: "30px",
    p: "15px 35px",
    "&:hover": {
      background: "#ee556a",
    },
    textTransform: "none",
    float: "right",
  },
  textMainContainer: { width: "800px", mt: "10px" },
  textContainer: {
    width: "100%",
    p: "20px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "10px",
  },
};
