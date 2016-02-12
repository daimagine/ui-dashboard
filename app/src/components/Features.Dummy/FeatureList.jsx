import React from 'react';
import * as Components from 'components';
import {
  Button,
  DropdownButton,
  Input,
  MenuItem,
} from 'react-bootstrap';


export default class FeatureList extends React.Component {
  render() {
    return (
      <div className="feature-list">
        <div className="feature-container">
          <div className="feature">
            <h1>Rate Us</h1>
            <DropdownButton title="+ add component" id="ddown-feature"
              bsSize="xsmall" bsStyle="info">
                <MenuItem>values</MenuItem>
                <MenuItem>partition</MenuItem>
                <MenuItem>rule</MenuItem>
            </DropdownButton>

            <div className="feature-value">
              <h2>values</h2>
              <div className="feature-value-json">
                <div className="json-obj">
                  <div className="key">key 1</div>
                  <div className="val">value 1</div>
                  <div className="adder">
                    <Button bsSize="xsmall">+</Button>
                    <div className="adder-control" style={{ display: 'none' }}>
                      <Input type="text" placeholder="name"
                        bsSize="small"/>
                      <Input type="select" placeholder="select"
                        bsSize="small">
                          <option value="text">text</option>
                          <option value="array">array</option>
                          <option value="object">object</option>
                          <option value="boolean">boolean</option>
                      </Input>
                      <span>:</span>
                      <Input type="text" placeholder="value"
                        bsSize="small"/>
                      <Button bsSize="small" bsStyle="info">add</Button>
                      <Button bsSize="small">cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-partition">
              <h2>partitions</h2>
              <div className="feature-partition-box">
                <div className="feature-partition-json">
                  <h4>partition 1</h4>
                  <div className="json-obj">
                    <div className="key">key 2</div>
                    <div className="val">value 2.1</div>
                    <div className="adder">
                      <Button bsSize="xsmall"
                        style={{ display: 'none' }}>+</Button>
                      <div className="adder-control">
                        <Input type="select" placeholder="select"
                          bsSize="small">
                            <option value="range">range</option>
                            <option value="text">text</option>
                            <option value="array">array</option>
                            <option value="object">object</option>
                            <option value="boolean">boolean</option>
                        </Input>
                        <Input type="text" placeholder="from"
                          bsSize="small"/>
                        <Input type="text" placeholder="to"
                          bsSize="small"/>
                        <Input type="text" placeholder="step"
                          bsSize="small"/>
                        <Button bsSize="small" bsStyle="info">add</Button>
                        <Button bsSize="small">cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-partition-json">
                  <h4>partition 2</h4>
                  <div className="json-obj">
                    <div className="key">key 2</div>
                    <div className="val">value 2.2</div>
                    <div className="adder">
                      <Button bsSize="xsmall">+</Button>
                    </div>
                  </div>
                </div>
                <div className="feature-partition-footer">
                  <Button bsSize="xsmall" bsStyle="info">
                    + add partition
                  </Button>
                </div>
              </div>
            </div>

            <div className="feature-rule">
              <h2>rules</h2>
              <div className="feature-rule-item">
                <h3>user</h3>
                <div className="feature-rule-component">
                  <DropdownButton title="+ add" bsSize="xsmall"
                    bsStyle="info" id="ddown-feature-rule">
                      <MenuItem>filter</MenuItem>
                      <MenuItem>values</MenuItem>
                      <MenuItem>partition</MenuItem>
                  </DropdownButton>
                </div>
                <div className="feature-rule-component">
                  <h4>filter</h4>
                  <div className="feature-filter-json">
                    <div className="json-obj">
                      <div className="key">key 2</div>
                      <div className="val">value 2.2</div>
                      <div className="adder">
                        <Button bsSize="xsmall">+</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-rule-component">
                  <h4>values</h4>
                  <div className="feature-value-json">
                    <div className="json-obj">
                      <div className="key">key 1</div>
                      <div className="val">value 1</div>
                      <div className="adder">
                        <Button bsSize="xsmall">+</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-rule-footer">
                <Button bsSize="xsmall" bsStyle="info">
                  + add rule
                </Button>
              </div>
            </div>
          </div>
          <div className="feature-footer">
            <Button bsStyle="primary" bsSize="medium">
              + add feature
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

FeatureList.propTypes = {
  features: React.PropTypes.array,
};
