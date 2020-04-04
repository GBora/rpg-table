import { Component, ComponentInterface, Host, h, Prop, State } from '@stencil/core';
import IOption from '../../interfaces/IOption';
import { getRandom, getMaxLength } from '../../utils/utils';

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

    let getRandomSubject = () => {
      this.generated = [];

      this.options.forEach((optionList, index) => {
        this.generated.push({
          name: this.headers[index],
          value: getRandom<string>(optionList)
        }) 
      })
    }

    if (this.source) {
      // Reset data 
      this.tableData = null;
      this.headers = [];
      this.options = [];
      this.rows = [];
      // this.generated = [];

      try {
        this.tableData = window[this.source];
        // Extract the headers
        this.headers = Object.keys(this.tableData);
        // Extract each option, options[1] is the array of options for headers[1] 
        this.headers.forEach((header) => {
          this.options.push(this.tableData[header]);
        })
        let longestOption = getMaxLength(this.options);

        for (let i = 0; i < longestOption; i++) {
          let newRow = [];
          this.options.forEach((optionArray) => {
            if (optionArray[i]) {
              newRow.push(optionArray[i]);
            } else {
              newRow.push("");
            }
          });
          this.rows.push(newRow);
        }
        // Build random
        if (this.generated.length === 0) {
          getRandomSubject();
        }
      } catch (e) {
        console.error(e);
      }
    }

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
                onClick={ () => getRandomSubject() }>
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
