import React from "react"
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import { CSVLink } from "react-csv"


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      schema: Object.assign({}, this.props.schema)
    };
  }

  updateData = (newData) => {
    this.setState({
      data: newData
    })
  }

  getFields = () => {
    if (this.state.schema && this.state.schema.fields) {
      return this.state.schema.fields
    }
    const fields = []
    for (let key in this.state.data[0]) {
      fields.push({
        name: key
      })
    }
    return fields
  }

  render() {
    return (
      <ReactTable
        data= {this.state.data}
        columns={this.getFields().map(field => {
          return {
            Header: field.name,
            accessor: field.name,
            Cell: props => <div className={field.type || ''}>
              {(typeof props.value === "string" && props.value.includes("http" || "https")) ? <a href={props.value} style={{textDecoration: "underline"}}>{props.value}</a> : <span>{props.value}</span>}
            </div>
          }
        })}
        getTheadThProps={() => {
          return {style: {"wordWrap": "break-word", "whiteSpace": "initial"}}
        }}
        showPagination={false}
        defaultPageSize={100}
        showPageSizeOptions={false}
        minRows={10}
      />
    )
  }
}
