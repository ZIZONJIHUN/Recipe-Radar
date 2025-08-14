'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Modal,
  Loading,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
  Label,
  Icon,
  Avatar,
  Badge,
  Tag,
  Divider,
  Toast,
  Dialog,
  Spinner,
  ProgressBar,
  Skeleton,
  Pagination,
  Image,
  Chip,
  Spacer,
  Notification,
  Popover,
  Tooltip
} from '@/lib/components/ui'

export default function ComponentsPage() {
  // State for interactive demos
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const selectOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ]

  const radioOptions = [
    { value: 'radio1', label: '라디오 1' },
    { value: 'radio2', label: '라디오 2' },
    { value: 'radio3', label: '라디오 3' }
  ]

  return (
    <div className="min-h-screen bg-neutral-gray-200 dark:bg-neutral-gray-900">
      {/* Fixed home button */}
      <Link 
        href="/" 
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg transition-all duration-normal hover:shadow-xl"
      >
        <Icon name="home" size="md" />
      </Link>

      {/* Header */}
      <Navbar>
        <NavbarBrand>
          <Icon name="star" className="text-primary" />
          <span className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white">컴포넌트 데모</span>
        </NavbarBrand>
        <NavbarContent>
          <Badge variant="primary">Airbnb 테마</Badge>
        </NavbarContent>
      </Navbar>

      <div className="max-w-container mx-auto p-6 space-y-12">
        
        {/* Buttons Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-6">버튼 컴포넌트</h2>
          <Card padding="md">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Primary 버튼</h3>
                  <div className="space-y-2">
                    <Button variant="primary" size="sm">작은 버튼</Button>
                    <Button variant="primary" size="md">보통 버튼</Button>
                    <Button variant="primary" size="lg">큰 버튼</Button>
                    <Button variant="primary" loading>로딩 중</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Secondary 버튼</h3>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm">작은 버튼</Button>
                    <Button variant="secondary" size="md">보통 버튼</Button>
                    <Button variant="secondary" size="lg">큰 버튼</Button>
                    <Button variant="secondary" disabled>비활성화</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Icon 버튼</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="icon" size="sm"><Icon name="heart" /></Button>
                    <Button variant="icon" size="md"><Icon name="star" /></Button>
                    <Button variant="icon" size="lg"><Icon name="user" /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Components Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">폼 컴포넌트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="md">
              <CardHeader>
                <CardTitle>입력 컴포넌트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input 
                    label="이메일" 
                    placeholder="이메일을 입력하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input 
                    label="비밀번호" 
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    error="비밀번호는 8자 이상이어야 합니다"
                  />
                  <Textarea 
                    label="메시지"
                    placeholder="메시지를 입력하세요"
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card padding="md">
              <CardHeader>
                <CardTitle>선택 컴포넌트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select 
                    label="카테고리 선택"
                    options={selectOptions}
                    value={selectValue}
                    onChange={setSelectValue}
                    placeholder="카테고리를 선택하세요"
                  />
                  <div>
                    <Label>체크박스</Label>
                    <div className="mt-2">
                      <Checkbox 
                        label="이용약관에 동의합니다"
                        checked={checkboxChecked}
                        onChange={(e) => setCheckboxChecked(e.target.checked)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>라디오 버튼</Label>
                    <div className="mt-2">
                      <RadioGroup 
                        name="demo-radio"
                        options={radioOptions}
                        value={radioValue}
                        onChange={setRadioValue}
                      />
                    </div>
                  </div>
                  <Toggle 
                    label="알림 허용"
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Display Components Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">디스플레이 컴포넌트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="md">
              <CardHeader>
                <CardTitle>아바타 & 뱃지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">아바타</h4>
                    <div className="flex items-center space-x-3">
                      <Avatar size="sm" fallback="S" />
                      <Avatar size="md" fallback="M" />
                      <Avatar size="lg" fallback="L" />
                      <Avatar size="xl" fallback="XL" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">뱃지</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">태그</h4>
                    <div className="flex flex-wrap gap-2">
                      <Tag variant="primary">React</Tag>
                      <Tag variant="secondary">Next.js</Tag>
                      <Tag variant="outline" closable onClose={() => {}}>TypeScript</Tag>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <CardTitle>아이콘 & 로딩</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">아이콘</h4>
                    <div className="flex flex-wrap gap-3">
                      <Icon name="heart" className="text-primary" />
                      <Icon name="star" className="text-semantic-warning" />
                      <Icon name="user" className="text-neutral-gray-700" />
                      <Icon name="search" />
                      <Icon name="home" />
                      <Icon name="check" className="text-semantic-success" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">로딩 컴포넌트</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                      </div>
                      <Loading text="로딩 중..." />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">프로그레스 바</h4>
                    <div className="space-y-2">
                      <ProgressBar value={30} showPercentage />
                      <ProgressBar value={65} variant="success" />
                      <ProgressBar value={85} variant="warning" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">카드 컴포넌트</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover padding="md">
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-gray-700">
                  이것은 기본 카드 컴포넌트입니다. 호버 효과가 적용되어 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary">액션</Button>
              </CardFooter>
            </Card>

            <Card padding="none" className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-primary-light"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">이미지 카드</h3>
                <p className="text-neutral-gray-700">
                  상단에 이미지가 있는 카드 레이아웃입니다.
                </p>
              </div>
            </Card>

            <Card padding="md" className="border border-primary/20">
              <CardContent>
                <div className="text-center">
                  <Icon name="star" className="text-semantic-warning mx-auto mb-3" size="xl" />
                  <h3 className="text-xl font-semibold mb-2">특별 카드</h3>
                  <p className="text-neutral-gray-700">
                    테두리와 아이콘이 있는 특별한 카드입니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skeleton Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">스켈레톤 로딩</h2>
          <Card padding="md">
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <Skeleton variant="rectangular" height={200} />
                <div className="space-y-2">
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Modal & Dialog Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">모달 & 다이얼로그</h2>
          <Card padding="md">
            <CardContent>
              <div className="flex gap-4">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  모달 열기
                </Button>
                <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                  다이얼로그 열기
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setToastVisible(true)}
                  disabled={toastVisible}
                >
                  토스트 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dividers */}
        <Divider>구분선</Divider>
        <Divider variant="dashed" />

        {/* Pagination Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">페이지네이션</h2>
          <Card padding="md">
            <CardContent>
              <div className="text-center">
                <p className="text-lg text-neutral-gray-700 mb-4">
                  현재 페이지: {currentPage}
                </p>
                <Pagination 
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Components Section */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">추가 컴포넌트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="md">
              <CardHeader>
                <CardTitle>칩 & 툴팁</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Chip 컴포넌트</h4>
                    <div className="flex flex-wrap gap-2">
                      <Chip variant="primary" icon={<Icon name="star" size="sm" />}>
                        인기
                      </Chip>
                      <Chip variant="secondary">React</Chip>
                      <Chip variant="outline" closable onClose={() => {}}>
                        TypeScript
                      </Chip>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tooltip 컴포넌트</h4>
                    <div className="flex gap-4">
                      <Tooltip content="상단 툴팁" placement="top">
                        <Button variant="secondary" size="sm">상단</Button>
                      </Tooltip>
                      <Tooltip content="하단 툴팁" placement="bottom">
                        <Button variant="secondary" size="sm">하단</Button>
                      </Tooltip>
                      <Tooltip content="왼쪽 툴팁" placement="left">
                        <Button variant="secondary" size="sm">왼쪽</Button>
                      </Tooltip>
                      <Tooltip content="오른쪽 툴팁" placement="right">
                        <Button variant="secondary" size="sm">오른쪽</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <CardTitle>팝오버 & 이미지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Popover 컴포넌트</h4>
                    <Popover
                      trigger={
                        <Button variant="primary" size="sm">
                          팝오버 열기
                        </Button>
                      }
                      content={
                        <div className="space-y-2">
                          <p className="text-lg font-medium">팝오버 내용</p>
                          <p className="text-md text-neutral-gray-700">
                            여기에 자세한 내용을 표시할 수 있습니다.
                          </p>
                          <Button variant="primary" size="sm">
                            액션
                          </Button>
                        </div>
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">이미지 컴포넌트</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Image
                        src="https://picsum.photos/100/100?random=1"
                        alt="샘플 이미지 1"
                        aspectRatio="square"
                        className="rounded-lg"
                      />
                      <Image
                        src="https://picsum.photos/100/100?random=2"
                        alt="샘플 이미지 2"
                        aspectRatio="square"
                        className="rounded-lg"
                      />
                      <Image
                        src="invalid-url"
                        alt="에러 이미지"
                        aspectRatio="square"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacer Demo */}
        <section>
          <h2 className="text-4xl font-bold text-neutral-gray-900 mb-6">스페이서 컴포넌트</h2>
          <Card padding="md">
            <CardContent>
              <div className="flex items-center">
                <span className="bg-primary text-white px-3 py-2 rounded">요소 1</span>
                <Spacer size="md" direction="horizontal" />
                <span className="bg-semantic-success text-white px-3 py-2 rounded">요소 2</span>
                <Spacer size="lg" direction="horizontal" />
                <span className="bg-semantic-warning text-white px-3 py-2 rounded">요소 3</span>
              </div>
              <Spacer size="xl" />
              <div className="text-center">
                <p className="text-lg text-neutral-gray-700">
                  위아래로 XL 크기의 스페이서가 적용되었습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="데모 모달"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-lg text-neutral-gray-700">
            이것은 모달 컴포넌트의 데모입니다. Escape 키를 누르거나 외부를 클릭하여 닫을 수 있습니다.
          </p>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Modal>

      {/* Dialog */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="확인 다이얼로그"
        description="이 작업을 계속 진행하시겠습니까?"
        onConfirm={() => alert('확인되었습니다!')}
        confirmText="확인"
        cancelText="취소"
      />

      {/* Toast */}
      {toastVisible && (
        <Toast
          title="성공!"
          description="토스트 메시지가 표시되었습니다."
          variant="success"
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  )
}