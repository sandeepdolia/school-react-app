import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getArrow, sortData } from '../utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableSortLabel
} from 'material-ui/Table'

import Header from './Header'
import Pagination from './Pagination'
import { loadDatabaseList } from '../actions/app'

const styleTable = {
  id: {width: '10%'},
  name: {width: '15%'},
  description: {width: '65%'}
}

class App extends Component {

  createSortHandler = property => event => {
  this.props.onRequestSort(event, property);
};

  state = {
    acValue: '',
    dataset: [],
    currPage: 1,
    onPage: 500,
    totalPages: 1,
    sortCol: '',
    sortAsc: true
  }

  componentWillMount() {
    this.props.loadDatabaseList()
  }
  componentWillReceiveProps(props) {
    let dataset = props.app.data
    if (this.state.acValue.trim())
      dataset = dataset.filter(item => this.filter(this.state.acValue, item.name))

    this.setState({
      totalPages: Math.ceil(props.app.data.length / this.state.onPage),
      dataset
    })
  }

  filter(value, key) {
    return key.toLowerCase().indexOf(value.toLowerCase()) !== -1
  }
  onACChange(acValue) {
    if (!acValue.trim())
      this.setState({
        dataset: this.props.app.data,
        acValue,
        currPage: 1,
        totalPages: Math.ceil(this.props.app.data.length / this.state.onPage)
      })
    else {
      let dataset = this.props.app.data.filter(item => this.filter(acValue, item.name))
      this.setState({
        dataset,
        acValue,
        currPage: 1,
        totalPages: Math.ceil(dataset.length / this.state.onPage)
      })
    }
  }


  render() {
    let data = this.state.dataset
    if (data)
      data = data.slice(
        ((this.state.currPage - 1) * this.state.onPage),
        (this.state.currPage * this.state.onPage)
      )
    return (
      <MuiThemeProvider>
        <div>
          <div className='row'>
            <Header />
            <br />
            <br />
            <br />
            <div className='col left'>
              <AutoComplete
                hintText='Enter name'
                searchText={this.state.searchText}
                onUpdateInput={::this.onACChange}
                dataSource={data}
                dataSourceConfig={{ text: 'name', value: 'name'}}
                filter={::this.filter}
                openOnFocus={true}
              />
            </div>
            <div className='col right'>
              {this.state.totalPages > 1 && <Pagination
                currPage={this.state.currPage}
                totalPages={this.state.totalPages}
                setPage={(page) => this.setState({currPage: page})}
              />}
            </div>
          </div>
          {!this.props.app.fetching
            ? this.getTable(data)
            :  <CircularProgress />}
        </div>
      </MuiThemeProvider>
    )
  }
  getTable(data) {
    if (Object.keys(data).length)
    return (
       <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
          <TableHeaderColumn style={styleTable.name}>
            Name
          </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.alpha_two_code}>
              Alpha Code
            </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.country}>
              Country
            </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.web_pages}>
              Web Pages
            </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.domains}>
              Domains
            </TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}
        >
        { data.map((item, i) => (
          <TableRow key={i}>
          <TableRowColumn style={styleTable.name}>
            { item.name }
          </TableRowColumn>
            <TableRowColumn style={styleTable.alpha_two_code}>
              { item.alpha_two_code }
            </TableRowColumn>
            <TableRowColumn style={styleTable.country}>
              { item.country }
            </TableRowColumn>
            <TableRowColumn style={styleTable.web_pages}>
          //    { this.formatArrayToString(item.web_pages)  }
            </TableRowColumn>
            <TableRowColumn style={styleTable.domains}>
          //    { this.formatArrayToString(item.domains) }
            </TableRowColumn>
            <TableRowColumn>
              <IconButton>
                <EditorModeEdit />
              </IconButton>
              <IconButton>
                <ActionDelete />
              </IconButton>
            </TableRowColumn>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    )
  }
  formatArrayToString(array) {
    let start = array
    let end = start.slice(0, 3)
    if (start.length > 3)
      end = end.concat('...')

    return end.join()
  }
}

function mapStateToProps(state) {
  return {
    app: state.rootReducer.app
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadDatabaseList: bindActionCreators(loadDatabaseList, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
