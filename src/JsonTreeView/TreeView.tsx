import { Icon, Label, Stack } from '@fluentui/react';
import { MessageBar,MessageBarType } from '@fluentui/react/lib/MessageBar';
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
            <div>
                <ul>
                    {data.map((tree) => {
                        return (<div key={tree.id}><TreeNode node={tree}/></div>);
                    })}
                </ul>
            </div>
        );

    },[]);


    const TreeNode = React.useCallback(({node}:{node: any}) : JSX.Element => {
        const [childVisible, setChildVisiblity] = React.useState(false);

        const hasChild = node.children ? true : false;
        
        return(
            <> 
                <li>
                    <div
                        onClick={(event) => setChildVisiblity((visibility) => !visibility)}>
                        {
                            hasChild && (
                                <div>
                                    <Icon iconName= {childVisible ? 'ChevronDown' : 'ChevronRight'}   />
                                </div>
                            )
                        }
                        <div>
                            {node.label}
                        </div>
                    </div>

                    {
                        hasChild && childVisible && 
                    <div>
                        <ul>
                            <Tree data={node.children} />
                        </ul>
                    </div>
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

                <Tree data={treeData} />
                
            }
            
            
        </>
    );
});

TreeView.displayName = 'treeView';