import { Component, ComponentInterface, Host, h, Prop, State } from '@stencil/core';
import IOption from '../../interfaces/IOption';
import { getRandom, getMaxLength, getRandomSubject, initTable } from '../../utils/utils';

@Component({
  tag: 'gen-table',
  styleUrl: 'gen-table.css',
  shadow: true,
})
export class GenTable implements ComponentInterface {
  @Prop() subject: string;
  @Prop() source: string;
  @State() showTable: boolean = false;
  tableData: any;
  headers: any[] = [];
  options: any[] = [];
  rows: any[] = [];
  @State() generated: IOption[] = [];

  render() {

    [this.tableData, this.headers, this.options, this.rows, this.generated] = initTable(this.source, this.tableData, this.headers, this.options, this.rows, this.generated);

    return (
      <Host>
        <slot>
          <div class="gen-table">

            <div class="gen-table-title">
              <span class="gen-table-capitalized">{ this.subject }</span> Table
            </div>

            <div class="gen-table-result">
              <div class="gen-table-mb"> Generated <span class="gen-table-capitalized">{ this.subject }</span> </div>

              <div>
                {
                  this.generated.length && this.generated.map((selectedOption, index) => 
                    <div key={ index }>
                      <span class="gen-table-capitalized">{ selectedOption.name }</span> : <span class="gen-table-capitalized">{ selectedOption.value }</span>
                    </div>
                  )
                }
              </div>
            </div>

            <div class="gen-table-btn-wrapper">
              <button 
                class="gen-table-mr"
                onClick={ () => {
                  this.generated = getRandomSubject(this.options, this.headers);
                } }>
                New
              </button>
              <button
                class="gen-table-ml" 
                onClick={ () => { this.showTable = !this.showTable } }>
                  See Options
                </button>
            </div>

            <div>
              {
                this.showTable && 
                <table class="gen-table-tb">
                  <thead class="gen-table-head">
                    <th>Roll</th>
                    {
                      this.headers.map((header, index) => <th key={ index }>{ header }</th>)
                    }
                  </thead>
                  <tbody class="gen-table-body">
                    {
                      this.rows.map((row, index) => 
                        <tr key={ index } class="gen-table-row">
                            <td>{ index + 1 }</td>
                            {
                              row.map((option, index) => <td key={ index }>{ option }</td>)
                            }
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              }
            </div>
          </div>
        </slot>
      </Host>
    );
  }

}
