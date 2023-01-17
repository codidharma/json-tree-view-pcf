import { Icon, Label, Stack } from '@fluentui/react';
import { MessageBar,MessageBarType } from '@fluentui/react/lib/MessageBar';
import {mergeStyles} from '@fluentui/react/lib/Styling';
import * as React from 'react';
import { ITreeView } from './interfaces/ITreeView';
import { ITreeData } from './interfaces/ITreeData';


export const TreeView = React.memo((props: ITreeView) => {
    const {
        data,
        noDataMessage
    } =props;

    const [isErrored, setIsErrored] = React.useState(false);
    const [isInputNull, setIsInputNull] = React.useState(false);


    const treeData : any[] | undefined = React.useMemo(() => {
        
        if(data)
        {
            setIsInputNull(false);
            try
            {   return JSON.parse(data) as any[];    
                
            }
            catch
            {
                setIsErrored(true);   
            }
        }
        else
        {
            setIsInputNull(true);
            setIsErrored(false);
        }

    },[data]);

    const Tree = React.useCallback(({data} : {data:any[]}) : JSX.Element => {
        return(
            <>
                <ul>
                    {data.map((tree) => {
                        return (<TreeNode node={tree} key={tree.id}/>);
                    })}
                </ul>
            </>
                
        );

    },[]);

    const iconClass = mergeStyles({
        fontSize: 10,
        height: 10,
        width: 10,
        margin: '0 5px',
    });


    const TreeNode = React.useCallback(({node}:{node: any}) : JSX.Element => {
        const [childVisible, setChildVisiblity] = React.useState(false);

        const hasChild = node.children ? true : false;
        
        return(
            <> 
                <li>
                    <div className='box'
                        onClick={(event) => setChildVisiblity((visibility) => !visibility)}>
                        {
                            hasChild && (
                                <div>
                                    <Icon iconName= {childVisible ? 'CalculatorSubtract' : 'CalculatorAddition'} className = {iconClass}   />
                                </div>
                            )
                        }
                        <div>
                            {node.label}
                        </div>
                    </div>

                    {
                        hasChild && childVisible && 
                    
                        <ul>
                            <Tree data={node.children} />
                        </ul>
                    
                    }
                </li>
            </>
        );

    },[]);

    return(
        <>
            {
                isInputNull && 
                <Label>{noDataMessage}</Label>
            }
            {
                (isErrored || treeData === undefined ) && 
                <MessageBar
                    messageBarType={MessageBarType.error}
                    isMultiline = {false}
                    dismissButtonAriaLabel = 'close'
                >    
                Error in parsing the data received.
                </MessageBar>
            }
            {
                !isInputNull && !isInputNull && treeData &&

                <div>
                    <Tree data={treeData} />
                </div>

                
                
            }
            
            
        </>
    );
});

TreeView.displayName = 'treeView';