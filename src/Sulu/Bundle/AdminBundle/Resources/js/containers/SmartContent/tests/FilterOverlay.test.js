// @flow
import React from 'react';
import {extendObservable as mockExtendObservable} from 'mobx';
import {shallow, mount} from 'enzyme';
import MultiListOverlay from '../../../containers/MultiListOverlay';
import SingleListOverlay from '../../../containers/SingleListOverlay';
import SmartContentStore from '../stores/SmartContentStore';
import FilterOverlay from '../FilterOverlay';
import MultiSelectionStore from '../../../stores/MultiSelectionStore';

jest.mock('../stores/SmartContentStore', () => jest.fn());

jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));

jest.mock('../../../containers/MultiAutoComplete', () => jest.fn(() => null));
jest.mock('../../../containers/MultiListOverlay', () => jest.fn(() => null));
jest.mock('../../../containers/SingleListOverlay', () => jest.fn(() => null));
jest.mock('../../../stores/MultiSelectionStore', () => jest.fn(function() {
    mockExtendObservable(this, {
        items: [],
    });
}));

test('Do not display if open is set to false', () => {
    const smartContentStore = new SmartContentStore('content');

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = shallow(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter="table"
            dataSourceListKey="snippets"
            dataSourceResourceKey="snippets"
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={false}
            presentations={{}}
            sections={[]}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );

    expect(filterOverlay.find('Overlay').prop('open')).toEqual(false);
});

test('Pass rootKey for categories to options for category list', () => {
    const smartContentStore = new SmartContentStore('content');
    // $FlowFixMe
    smartContentStore.loading = false;

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = shallow(
        <FilterOverlay
            categoryRootKey="test1"
            dataSourceAdapter="table"
            dataSourceListKey="snippets"
            dataSourceResourceKey="snippets"
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={false}
            presentations={{}}
            sections={['categories']}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );

    expect(filterOverlay.find(MultiListOverlay).find('[resourceKey="categories"]').prop('options'))
        .toEqual({rootKey: 'test1'});
});

test('Render with ListOverlays if smartContentStore is loaded', () => {
    const smartContentStore = new SmartContentStore('content');
    // $FlowFixMe
    smartContentStore.loading = false;

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = shallow(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter="table"
            dataSourceListKey="snippets"
            dataSourceResourceKey="snippets"
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{}}
            sections={['datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit']}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );

    expect(filterOverlay.find(SingleListOverlay)).toHaveLength(1);
    expect(filterOverlay.find(MultiListOverlay)).toHaveLength(1);
});

test('Render without ListOverlays if smartContentStore is not loaded', () => {
    const smartContentStore = new SmartContentStore('content');
    // $FlowFixMe
    smartContentStore.loading = true;

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter={undefined}
            dataSourceListKey={undefined}
            dataSourceResourceKey={undefined}
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{}}
            sections={['datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit']}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );
    expect(filterOverlay.find(SingleListOverlay)).toHaveLength(0);
    expect(filterOverlay.find(MultiListOverlay)).toHaveLength(0);
});

test('Render with all fields', () => {
    const smartContentStore = new SmartContentStore('content');

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter={undefined}
            dataSourceListKey={undefined}
            dataSourceResourceKey={undefined}
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{}}
            sections={['datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit']}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );
    expect(filterOverlay.find('Portal').at(1).render()).toMatchSnapshot();
});

test('Render with no fields', () => {
    const smartContentStore = new SmartContentStore('content');

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter={undefined}
            dataSourceListKey={undefined}
            dataSourceResourceKey={undefined}
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{}}
            sections={[]}
            smartContentStore={smartContentStore}
            sortings={[]}
            title="Test"
            types={[]}
        />
    );
    expect(filterOverlay.find('Portal').at(1).render()).toMatchSnapshot();
});

test('Fill all fields using and update SmartContentStore on confirm', () => {
    const smartContentStore = new SmartContentStore('content');
    const closeSpy = jest.fn();

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter="table"
            dataSourceListKey="pages_list"
            dataSourceResourceKey="pages"
            defaultValue={defaultValue}
            onClose={closeSpy}
            open={true}
            presentations={{
                small: 'Small',
                large: 'Large',
            }}
            sections={[
                'datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit', 'types',
            ]}
            smartContentStore={smartContentStore}
            sortings={[
                {name: 'title', value: 'Title'},
                {name: 'changed', value: 'Changed'},
            ]}
            title="Test"
            types={[
                {name: 'default', value: 'default'},
                {name: 'homepage', value: 'homepage'},
            ]}
        />
    );

    const pagesOptions = {listKey: 'pages_list', resourceKey: 'pages'};

    filterOverlay.find('Button[children="sulu_admin.choose_data_source"]').prop('onClick')();
    filterOverlay.update();
    expect(filterOverlay.find(SingleListOverlay).find(pagesOptions).prop('open')).toEqual(true);
    filterOverlay.find(SingleListOverlay).find(pagesOptions).prop('onConfirm')({id: 2, title: 'Test'});
    filterOverlay.update();
    expect(filterOverlay.find(SingleListOverlay).find(pagesOptions).prop('open')).toEqual(false);
    expect(filterOverlay.find('section').at(1).find('label[className="description"]').text())
        .toEqual('sulu_admin.data_source: Test');

    filterOverlay.find('Toggler[children="sulu_admin.include_sub_elements"]').prop('onChange')(true);
    filterOverlay.update();
    expect(filterOverlay.find('Toggler[children="sulu_admin.include_sub_elements"]').prop('checked')).toEqual(true);

    filterOverlay.find('Button[children="sulu_admin.choose_categories"]').prop('onClick')();
    filterOverlay.update();
    expect(filterOverlay.find(MultiListOverlay).find({resourceKey: 'categories'}).prop('open')).toEqual(true);
    filterOverlay.find(MultiListOverlay).find({resourceKey: 'categories'}).prop('onConfirm')([
        {id: 1, name: 'Test1'},
        {id: 3, name: 'Test2'},
    ]);
    filterOverlay.update();
    expect(filterOverlay.find(MultiListOverlay).find({resourceKey: 'categories'}).prop('open')).toEqual(false);
    expect(filterOverlay.find('section').at(2).find('label[className="description"]').text())
        .toEqual('sulu_category.categories: Test1, Test2');

    filterOverlay.find('div[className="categories"]').find('SingleSelect').prop('onChange')('and');
    filterOverlay.update();
    expect(filterOverlay.find('div[className="categories"]').find('SingleSelect').prop('value')).toEqual('and');

    filterOverlay.instance().tagSelectionStore.items.push({id: 1, name: 'Test 1'}, {id: 2, name: 'Test 3'});
    expect(filterOverlay.instance().tags).toEqual(['Test 1', 'Test 3']);

    filterOverlay.find('div[className="tags"]').find('SingleSelect').prop('onChange')('or');
    filterOverlay.update();
    expect(filterOverlay.find('div[className="tags"]').find('SingleSelect').prop('value')).toEqual('or');

    filterOverlay.find('div[className="types"]').find('MultiSelect').prop('onChange')(['default']);
    filterOverlay.update();
    expect(filterOverlay.find('div[className="types"]').find('MultiSelect').prop('values')).toEqual(['default']);

    filterOverlay.find('Toggler[children="sulu_admin.use_target_groups"]').prop('onChange')(false);
    filterOverlay.update();
    expect(filterOverlay.find('Toggler[children="sulu_admin.use_target_groups"]').prop('checked')).toEqual(false);

    filterOverlay.find('div[className="sortColumn"]').find('SingleSelect').prop('onChange')('changed');
    filterOverlay.update();
    expect(filterOverlay.find('div[className="sortColumn"]').find('SingleSelect').prop('value')).toEqual('changed');

    filterOverlay.find('div[className="sortOrder"]').find('SingleSelect').prop('onChange')('asc');
    filterOverlay.update();
    expect(filterOverlay.find('div[className="sortOrder"]').find('SingleSelect').prop('value')).toEqual('asc');

    filterOverlay.find('div[className="presentation"]').find('SingleSelect').prop('onChange')('large');
    filterOverlay.update();
    expect(filterOverlay.find('div[className="presentation"]').find('SingleSelect').prop('value')).toEqual('large');

    filterOverlay.find('div[className="limit"] Number').prop('onChange')(7);
    filterOverlay.update();
    expect(filterOverlay.find('div[className="limit"] Number').prop('value')).toEqual(7);

    expect(smartContentStore.dataSource).toEqual(undefined);
    expect(smartContentStore.includeSubElements).toEqual(undefined);
    expect(smartContentStore.categories).toEqual(undefined);
    expect(smartContentStore.categoryOperator).toEqual(undefined);
    expect(smartContentStore.tags).toEqual(undefined);
    expect(smartContentStore.tagOperator).toEqual(undefined);
    expect(smartContentStore.audienceTargeting).toEqual(undefined);
    expect(smartContentStore.sortBy).toEqual(undefined);
    expect(smartContentStore.sortOrder).toEqual(undefined);
    expect(smartContentStore.presentation).toEqual(undefined);
    expect(smartContentStore.limit).toEqual(undefined);
    expect(smartContentStore.types).toEqual(undefined);

    filterOverlay.find('Overlay').prop('onConfirm')();

    expect(smartContentStore.dataSource).toEqual({id: 2, title: 'Test'});
    expect(smartContentStore.includeSubElements).toEqual(true);
    expect(smartContentStore.categories).toEqual([{id: 1, name: 'Test1'}, {id: 3, name: 'Test2'}]);
    expect(smartContentStore.categoryOperator).toEqual('and');
    expect(smartContentStore.tags).toEqual(['Test 1', 'Test 3']);
    expect(smartContentStore.tagOperator).toEqual('or');
    expect(smartContentStore.audienceTargeting).toEqual(false);
    expect(smartContentStore.sortBy).toEqual('changed');
    expect(smartContentStore.sortOrder).toEqual('asc');
    expect(smartContentStore.presentation).toEqual('large');
    expect(smartContentStore.limit).toEqual(7);
    expect(smartContentStore.types).toEqual(['default']);

    expect(closeSpy).toBeCalledWith();
});

test('Prefill all fields with correct values', () => {
    const smartContentStore = new SmartContentStore('content');
    smartContentStore.dataSource = {id: 4, title: 'Homepage'};
    smartContentStore.includeSubElements = true;
    smartContentStore.categories = [{id: 1, name: 'Test1'}, {id: 5, name: 'Test3'}];
    smartContentStore.categoryOperator = 'or';
    smartContentStore.tags = [1, 2];
    smartContentStore.tagOperator = 'and';
    smartContentStore.audienceTargeting = true;
    smartContentStore.sortBy = 'created';
    smartContentStore.sortOrder = 'desc';
    smartContentStore.presentation = 'small';
    smartContentStore.limit = 8;
    smartContentStore.types = ['default', 'homepage'];

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter="table"
            dataSourceListKey="pages"
            dataSourceResourceKey="pages"
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{
                small: 'Small',
                large: 'Large',
            }}
            sections={[
                'datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit', 'types',
            ]}
            smartContentStore={smartContentStore}
            sortings={[
                {name: 'title', value: 'Title'},
                {name: 'created', value: 'Created'},
            ]}
            title="Test"
            types={[
                {name: 'default', value: 'default'},
                {name: 'homepage', value: 'homepage'},
            ]}
        />
    );

    const categoryOptions = {listKey: 'categories', resourceKey: 'categories'};

    expect(filterOverlay.find('section').at(1).find('label[className="description"]').text())
        .toEqual('sulu_admin.data_source: Homepage');
    expect(filterOverlay.find(SingleListOverlay).find({resourceKey: 'pages'}).prop('preSelectedItem'))
        .toEqual({id: 4, title: 'Homepage'});
    expect(filterOverlay.find('Toggler[children="sulu_admin.include_sub_elements"]').prop('checked')).toEqual(true);

    expect(filterOverlay.find('section').at(2).find('label[className="description"]').text())
        .toEqual('sulu_category.categories: Test1, Test3');
    expect(filterOverlay.find(MultiListOverlay).find(categoryOptions).prop('preSelectedItems'))
        .toEqual([{id: 1, name: 'Test1'}, {id: 5, name: 'Test3'}]);
    expect(filterOverlay.find('div[className="categories"]').find('SingleSelect').prop('value')).toEqual('or');

    expect(MultiSelectionStore).toBeCalledWith('tags', [1, 2], undefined, 'names');
    expect(filterOverlay.find('div[className="tags"]').find('SingleSelect').prop('value')).toEqual('and');

    expect(filterOverlay.find('div[className="types"]').find('MultiSelect').prop('values')).toEqual(
        ['default', 'homepage']
    );

    expect(filterOverlay.find('Toggler[children="sulu_admin.use_target_groups"]').prop('checked')).toEqual(true);

    expect(filterOverlay.find('div[className="sortColumn"]').find('SingleSelect').prop('value')).toEqual('created');
    expect(filterOverlay.find('div[className="sortOrder"]').find('SingleSelect').prop('value')).toEqual('desc');

    expect(filterOverlay.find('div[className="presentation"]').find('SingleSelect').prop('value')).toEqual('small');
    expect(filterOverlay.find('div[className="limit"] Number').prop('value')).toEqual(8);
});

test('Reset all fields when reset action is clicked', () => {
    const smartContentStore = new SmartContentStore('content');
    smartContentStore.dataSource = {id: 4, url: '/home'};
    smartContentStore.includeSubElements = true;
    smartContentStore.categories = [{id: 1, name: 'Test1'}, {id: 5, name: 'Test3'}];
    smartContentStore.categoryOperator = 'or';
    smartContentStore.tags = ['Test5', 'Test7'];
    smartContentStore.tagOperator = 'and';
    smartContentStore.audienceTargeting = true;
    smartContentStore.sortBy = 'created';
    smartContentStore.sortOrder = 'desc';
    smartContentStore.presentation = 'large';
    smartContentStore.limit = 5;
    smartContentStore.types = ['default', 'homepage'];

    const defaultValue = {
        dataSource: 1,
        includeSubFolders: true,
        categories: [],
        categoryOperator: 'and',
        tags: [],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'title',
        sortMethod: 'asc',
        presentAs: 'two',
        limitResult: 5,
        types: [],
    };

    const filterOverlay = mount(
        <FilterOverlay
            categoryRootKey={undefined}
            dataSourceAdapter="table"
            dataSourceListKey="pages"
            dataSourceResourceKey="pages"
            defaultValue={defaultValue}
            onClose={jest.fn()}
            open={true}
            presentations={{
                small: 'Small',
                large: 'Large',
            }}
            sections={['datasource', 'categories', 'tags', 'audienceTargeting', 'sorting', 'presentation', 'limit']}
            smartContentStore={smartContentStore}
            sortings={[
                {name: 'title', value: 'Title'},
                {name: 'created', value: 'Created'},
            ]}
            title="Test"
            types={[
                {name: 'default', value: 'default'},
                {name: 'homepage', value: 'homepage'},
            ]}
        />
    );

    filterOverlay.find('Overlay').prop('actions')[0].onClick();
    filterOverlay.update();

    expect(filterOverlay.instance().dataSource).toEqual(1);
    expect(filterOverlay.instance().includeSubElements).toEqual(true);
    expect(filterOverlay.instance().categories).toEqual([]);
    expect(filterOverlay.instance().categoryOperator).toEqual('and');
    expect(filterOverlay.instance().tags).toEqual([]);
    expect(filterOverlay.instance().tagOperator).toEqual('or');
    expect(filterOverlay.instance().audienceTargeting).toEqual(true);
    expect(filterOverlay.instance().sortBy).toEqual('title');
    expect(filterOverlay.instance().sortOrder).toEqual('asc');
    expect(filterOverlay.instance().presentation).toEqual('two');
    expect(filterOverlay.instance().limit).toEqual(5);
    expect(filterOverlay.instance().types).toEqual([]);
});
